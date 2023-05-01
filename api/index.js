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
const Favorite = require("./models/Favorite.js");
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
    origin: "http://localhost:5173",
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

app.get("/users", async (req, res) => {
  const { name, email } = req.query;
  const existingUser = await User.findOne({
    $or: [{ name: name }, { email: email }],
  });
  if (existingUser) {
    res.json([existingUser]);
  } else {
    res.json([]);
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json("User with that email already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json(newUser);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user with provided email exists
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    return res.status(422).json("User not found");
  }

  // Check if password is correct for user with provided email
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (!passOk) {
    return res.status(422).json("Invalid password");
  }

  // Generate and send JWT token if login successful
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

app.post("/places/remove-image/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const { filename } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      try {
        fs.unlinkSync(filename); // remove image file from storage
        placeDoc.photos = placeDoc.photos.filter((photo) => photo !== filename);
        await placeDoc.save();
        res.json("ok");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove image." });
      }
    }
  });
});

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

app.delete("/user-places/:id", (req, res) => {
  const { id } = req.params;
  Place.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(500).json({ error: err.message }));
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

app.delete("/bookings/:id", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      user: userData.id,
    });
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    res.send("Booking deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.post("/favorites", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const { place } = req.body;
    const newFavorite = await Favorite.create({
      place,
      user: userData.id,
    });
    res.json(newFavorite);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/favorites", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Favorite.find({ user: userData.id }).populate("place"));
});

app.delete("/favorites/:id", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: userData.id,
    });
    if (!favorite) {
      return res.status(404).send("Favorite not found");
    }
    res.send("Favorite deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(4000);
