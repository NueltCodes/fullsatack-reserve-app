const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();
const app = express();
const path = require("path");
app.use("/image", express.static("image"));
app.use("/uploads", express.static("uploads"));

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
// app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

// app.post("/upload", photosMiddleware.array("photos"), (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i];
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath.replace("image/", ""));
//   }
//   res.json(uploadedFiles);
// });

// app.post("/places", photosMiddleware.array("images"), async (req, res) => {
//   const { token } = req.cookies;
//   const files = req.files;
//   if (!files) {
//     return res.status(400).json({ message: "No files uploaded" });
//   }

//   const fileNames = files.map((file) => file.filename);
//   try {
//     const place = new Place({
//       title: req.body,
//       address: req.body,
//       addedPhotos: req.body,
//       images: fileNames,
//       description: req.body,
//       perks: req.body,
//       roomPerks: req.body,
//       safetyGuide: req.body,
//       otherSpace: req.body,
//       extraInfo: req.body,
//       checkIn: req.body,
//       checkOut: req.body,
//       maxGuests: req.body,
//       rooms: req.body,
//       bed: req.body,
//       price: req.body,
//       rules1: req.body,
//       rules2: req.body,
//       rules3: req.body,
//       rules4: req.body,
//       rules5: req.body,
//     });
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       await place.create({
//         owner: userData.id,
//       });
//       res.json(placeDoc);
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error saving form" });
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

app.post("/places", upload.array("images"), async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    roomPerks,
    safetyGuide,
    otherSpace,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    rooms,
    bed,
    price,
    rules1,
    rules2,
    rules3,
    rules4,
    rules5,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      photos: addedPhotos,
      title,
      address,
      description,
      perks,
      images: req.files.map((file) => file.path),
      roomPerks,
      safetyGuide,
      otherSpace,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      rooms,
      bed,
      price,
      rules1,
      rules2,
      rules3,
      rules4,
      rules5,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places/:id", upload.array("images"), async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    roomPerks,
    safetyGuide,
    otherSpace,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    rooms,
    bed,
    price,
    rules1,
    rules2,
    rules3,
    rules4,
    rules5,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findByIdAndUpdate(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        owner: userData.id,
        photos: addedPhotos,
        title,
        address,
        description,
        perks,
        images: req.files.map((file) => file.path),
        roomPerks,
        safetyGuide,
        otherSpace,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        rooms,
        bed,
        price,
        rules1,
        rules2,
        rules3,
        rules4,
        rules5,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;
    const newBooking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    });
    res.json(newBooking);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(4000);
