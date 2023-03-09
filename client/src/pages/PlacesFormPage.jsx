import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { HiMinus, HiPlus } from "react-icons/hi";
import PhotoUploads from "../components/PhotoUploads";
import HouseRulesForm from "../components/Forminputs/HouseRulesForm";
import SafetyPerksForm from "../components/Forminputs/SafetyPerksForm";
import OtherSpaceForm from "../components/Forminputs/OtherSpaceForm";
import BedroomForm from "../components/Forminputs/BedroomForm";
import PerksLabelForm from "../components/Forminputs/PerksLabelForm";
import { BsArrowUpCircle } from "react-icons/bs";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [safetyGuide, setSafetyGuide] = useState([]);
  const [roomPerks, setRoomPerks] = useState([]);
  const [otherSpace, setOtherSpace] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rules1, setRules1] = useState("");
  const [rules2, setRules2] = useState("");
  const [rules3, setRules3] = useState("");
  const [rules4, setRules4] = useState("");
  const [rules5, setRules5] = useState("");
  const [maxGuests, setMaxGuests] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [bed, setBed] = useState(0);
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages((prev) => {
      return [...prev, ...files];
    });
  };
  // console.log(images);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setImages(data.images);
      setDescription(data.description);
      setPerks(data.perks);
      setRoomPerks(data.roomPerks);
      setOtherSpace(data.otherSpace);
      setSafetyGuide(data.safetyGuide);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setRooms(data.rooms);
      setBed(data.bed);
      setPrice(data.price);
      setRules1(data.rules1);
      setRules2(data.rules2);
      setRules3(data.rules3);
      setRules4(data.rules4);
      setRules5(data.rules5);
    });
  }, [id]);

  async function savePlace(ev) {
    ev.preventDefault();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000); // reset the button after 1 second
    const placeData = new FormData();
    placeData.append("title", title);
    placeData.append("address", address);
    placeData.append("description", description);
    addedPhotos.forEach((photo) => placeData.append("addedPhotos", photo));
    images.forEach((image) => placeData.append("images", image));
    perks.forEach((perk) => {
      placeData.append("perks[]", perk);
    });
    roomPerks.forEach((roomPerk) => {
      placeData.append("roomPerks[]", roomPerk);
    });
    safetyGuide.forEach((safety) => {
      placeData.append("safetyGuide[]", safety);
    });
    otherSpace.forEach((spaces) => {
      placeData.append("otherSpace[]", spaces);
    });
    placeData.append("extraInfo", extraInfo);
    placeData.append("checkIn", checkIn);
    placeData.append("checkOut", checkOut);
    placeData.append("maxGuests", maxGuests);
    placeData.append("rooms", rooms);
    placeData.append("bed", bed);
    placeData.append("price", price);
    placeData.append("rules1", rules1);
    placeData.append("rules2", rules2);
    placeData.append("rules3", rules3);
    placeData.append("rules4", rules4);
    placeData.append("rules5", rules5);

    if (id) {
      // update
      await axios.put(`/places/${id}`, placeData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      // create
      await axios.post("/places", placeData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    navigate("/");
  }

  // async function savePlace(ev) {
  //   ev.preventDefault();
  //   const placeData = {
  //     title,
  //     address,
  //     addedPhotos,
  //     images,
  //     description,
  //     perks,
  //     roomPerks,
  //     safetyGuide,
  //     otherSpace,
  //     extraInfo,
  //     checkIn,
  //     checkOut,
  //     maxGuests,
  //     rooms,
  //     bed,
  //     price,
  //     rules1,
  //     rules2,
  //     rules3,
  //     rules4,
  //     rules5,
  //   };

  //   if (id) {
  //     // update
  //     await axios.put("/places", {
  //       id,
  //       ...placeData,
  //     });
  //     navigate("/");
  //   } else {
  //     await axios.post("/places", placeData, {
  //       headers: { "Content-type": "multipart/form-data" },
  //     });
  //     navigate("/");
  //   }
  // }

  const guestIncrease = (e) => {
    e.preventDefault();
    setMaxGuests(maxGuests + 1);
  };

  const guestReduce = (e) => {
    e.preventDefault();
    setMaxGuests(maxGuests - 1);
  };

  const roomsReduce = (e) => {
    e.preventDefault();
    setRooms(rooms - 1);
  };

  const roomsIncrease = (e) => {
    e.preventDefault();
    setRooms(rooms + 1);
  };

  const bedReduce = (e) => {
    e.preventDefault();
    setBed(bed - 1);
  };

  const bedIncrease = (e) => {
    e.preventDefault();
    setBed(bed + 1);
  };
  return (
    <div className="px-4 lg:px-32 md:px-16 mx-auto overflow-hidden !bg-black min-h-screen">
      <div className="sm:block hidden">
        <AccountNav />
      </div>{" "}
      <div className="">
        <form onSubmit={savePlace}>
          <h2 className="md:text-2xl mt-4 font-semibold text-white text-[17px]">
            Title
          </h2>
          <p className="text-gray-300  text-sm">A short tilte for your place</p>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Lovely Home"
            className="w-full border my-1 py-2 px-3 rounded-2xl inputText"
          />
          <h2 className="md:text-2xl mt-4 font-semibold text-white text-[17px]">
            Address
          </h2>
          <p className="text-gray-300 text-sm">Address to your this place</p>
          <input
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
            className="w-full border my-1 py-2 px-3 rounded-2xl inputText"
          />
          <h2 className="md:text-2xl mt-4 font-semibold text-white text-[17px]">
            Photos
          </h2>
          <p className="text-gray-300 text-sm">
            Note: images added by links woiuld only be selected as the thumbnail
            if no selected image from device
          </p>
          <PhotoUploads addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
          {images && <div className="bg-green-700">{images.length}</div>}
          <div>
            <h2 className="md:text-2xl mt-4 font-semibold text-white text-[17px]">
              Description
            </h2>
            <p className="text-gray-300 text-sm">descrption of the place</p>
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of your places you want to put for lodge"
              className="inputText"
            />
          </div>
          <PerksLabelForm selected={perks} onChange={setPerks} />
          <BedroomForm selected={roomPerks} onChange={setRoomPerks} />
          <OtherSpaceForm selected={otherSpace} onChange={setOtherSpace} />
          <SafetyPerksForm selected={safetyGuide} onChange={setSafetyGuide} />
          <HouseRulesForm
            rules1={rules1}
            setRules1={setRules1}
            rules2={rules2}
            setRules2={setRules2}
            rules3={rules3}
            setRules3={setRules3}
            rules4={rules4}
            setRules4={setRules4}
            rules5={rules5}
            setRules5={setRules5}
          />
          <h2 className="md:text-2xl mt-8 font-semibold text-white text-[17px]">
            Extra Info
          </h2>
          <p className="text-gray-300 text-sm">Any extra info ? (optional)</p>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            className="inputText"
            placeholder="security dogs in the compound"
          />
          <h2 className="md:text-2xl mt-4 font-semibold text-white text-[17px]">
            Check in & out time
          </h2>
          <p className="text-gray-300 text-sm">
            add check in and out time, remeber to add some time window for
            cleaning the room before new guest arrival
          </p>
          <div className="grid gap-8 mx-2 grid-cols-2 lg:grid-cols-4">
            <div className="">
              <h3 className="mt-2 text-gray-300 -mb-1">Check in time</h3>
              <div className="flex  items-center">
                <input
                  type="number"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="9:00"
                  className="w-auto  border border-gray-500 my-1 py-2 px-3 bg-slate-700 text-white"
                />
                <span className="mx-2 text-gray-300 text-sm">am</span>
              </div>
            </div>

            <div className="">
              <h3 className="mt-2 -mb-1 text-gray-300">Check out time</h3>
              <div className="flex items-center">
                <input
                  type="number"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="11:00"
                  className="w-auto  border border-gray-500 my-1 py-2 px-3 bg-slate-700 text-white"
                />
                <span className="text-xs mx-2 text-gray-300">max 12:pm</span>
              </div>
            </div>

            <div>
              <h3 className="mt-2 -mb-1 text-gray-300">
                Price per night $({price})
              </h3>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-auto  border border-gray-500 my-1 py-2 px-3 bg-slate-700 text-white"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-10">
              <h3 className="mt-2 -mb-1 text-gray-300 w-[190px]">
                Max number of guests ({maxGuests})
              </h3>
              <div className="flex items-center mt-2 gap-5">
                <button
                  onClick={guestReduce}
                  disabled={maxGuests <= 1}
                  className="bg-red-900 p-2 text-white text-lg rounded-full hover:bg-red-600"
                >
                  <HiMinus size={22} />
                </button>

                <div className="text-white w-5 text-center">{maxGuests}</div>

                <button
                  onClick={guestIncrease}
                  className="bg-green-900 hover:bg-green-600 p-2 text-white text-lg rounded-full"
                >
                  <HiPlus size={22} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-10 my-6">
              <h3 className="mt-2 -mb-1 text-gray-300 w-[190px]">
                Number of Rooms ({rooms})
              </h3>
              <div className="flex items-center mt-2 gap-5">
                <button
                  onClick={roomsReduce}
                  disabled={rooms <= 1}
                  className="bg-red-900 p-2 text-white text-lg rounded-full hover:bg-red-600"
                >
                  <HiMinus size={22} />
                </button>

                <div className="text-white w-5 text-center">{rooms}</div>

                <button
                  onClick={roomsIncrease}
                  className="bg-green-900 hover:bg-green-600 p-2 text-white text-lg rounded-full"
                >
                  <HiPlus size={22} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <h3 className="mt-2 -mb-1 text-gray-300 w-[190px]">
                Numbers of beds ({bed})
              </h3>
              <div className="flex items-center mt-2 gap-5">
                <button
                  onClick={bedReduce}
                  disabled={bed <= 1}
                  className="bg-red-900 p-2 text-white text-lg rounded-full hover:bg-red-600"
                >
                  <HiMinus size={22} />
                </button>

                <div className="text-white w-5 text-center">{bed}</div>

                <button
                  onClick={bedIncrease}
                  className="bg-green-900 hover:bg-green-600 p-2 text-white text-lg rounded-full"
                >
                  <HiPlus size={22} />
                </button>
              </div>
            </div>
          </div>
          {id ? (
            <button
              className={` border-none
            ${isClicked ? "button-clicked w-full" : "primary my-8"}`}
            >
              {" "}
              Update
            </button>
          ) : (
            <button
              className={` border-none
          ${isClicked ? "button-clicked w-full" : "primary my-8"}`}
            >
              {" "}
              Create
            </button>
          )}
        </form>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 shadow-md rounded-full hover:bg-blue-600 animate-bounce"
      >
        <p className="sm:block hidden">Back to Top</p>
        <BsArrowUpCircle className="w-full sm:hidden block" />
      </button>
    </div>
  );
}
