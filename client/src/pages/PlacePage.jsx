import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BsArrowUpCircle, BsHeart, BsHeartFill } from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import BookingWidget from "../components/BookingWidget";
import EquipmentPerks from "../components/perks/EquipmentPerks";
import Essentials from "../components/perks/Essentials";
import HouseRules from "../components/perks/HouseRules";
import Perks from "../components/perks/Perks";
import SafetyProperty from "../components/perks/SafetyProperty";
import PlaceGallery from "../components/PlaceGallery";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

export default function PlacePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);
  const [showPerks, setShowPerks] = useState(false);
  const [roomEssentials, setRoomEssentials] = useState(false);
  const [amenities, setAmenities] = useState(false);
  const [rules, setRules] = useState(false);
  const [safety, setSafety] = useState(false);
  const [extraInfo, setExtraInfo] = useState(false);
  const [desc, setDesc] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    // Only make the request if the user is logged in
    if (user) {
      axios
        .get(`/favorites/${id}`)
        .then((response) => {
          setIsFavorite(response.data.isFavorite);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, user]);

  const toggleFavorite = async (placeId) => {
    if (user) {
      try {
        if (isFavorite) {
          await axios.delete(`/favorites/${placeId}`);
          toast.success("Removed from Favorites");
        } else {
          await axios.post(`/favorites/${placeId}`);
          toast.success("Added to Favorites");
        }
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  };

  if (!place) return "";

  function displayDesc() {
    setDesc((prev) => !prev);
  }

  function perk() {
    setShowPerks((prev) => !prev);
  }
  function essentials() {
    setRoomEssentials((prev) => !prev);
  }
  function amenity() {
    setAmenities((prev) => !prev);
  }
  function safetyControl() {
    setSafety((prev) => !prev);
  }
  function houseRules() {
    setRules((prev) => !prev);
  }

  function setExtra() {
    setExtraInfo((prev) => !prev);
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-4 lg:px-32 md:px-16 mx-auto overflow-hidden min-h-screen">
          <div className="flex items-center justify-between">
            <div
              onClick={() => navigate(-1)}
              className={
                "text-black w-9 flex justify-center items-center z-40 shadow-md bg-white p-2 rounded-full hover:shadow transition duration-200 ease-in-out cursor-pointer"
              }
            >
              <HiArrowLeft className="sm:text-2xl" />
            </div>
            <div
              className="cursor-pointer group"
              onClick={() => toggleFavorite(place._id)}
            >
              {isFavorite ? (
                <div className="flex gap-1 items-center">
                  <div className="bg-red-50 p-1 rounded-full">
                    <BsHeartFill size={24} className="text-red-500" />
                  </div>
                  <span className="text-sm font-semibold hidden sm:block">
                    Remove
                  </span>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <div className="bg-red-50 p-1 rounded-full">
                    <BsHeart size={24} className="text-red-600" />
                  </div>
                  <span className="text-sm font-semibold hidden sm:block">
                    add to favorites
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="pt-2">
            <div>
              <h1 className="sm:text-3xl text-2xl font-semibold">
                {place.title}
              </h1>
              <AddressLink>{place.address}</AddressLink>
            </div>

            <PlaceGallery place={place} />
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 sm:grid-cols-[2fr_1fr] ">
              <div>
                <div className="my-4 ">
                  <h2 className="font-semibold sm:text-3xl text-2xl">
                    Description
                  </h2>
                  <p className="leading-8 md:leading-10 line-clamp-7">
                    {place.description}
                  </p>
                  <div
                    className={`${
                      desc
                        ? "w-full md:text-lg text-sm fixed top-0 bg-gray-100 h-full  text-black pt-16 -mx-4 px-4 md:-mx-16 md:px-16 overflow-y-scroll lg:-mx-32 lg:px-32"
                        : " w-auto"
                    }  mb-4`}
                  >
                    {desc && (
                      <>
                        <h2 className="font-semibold sm:text-3xl text-2xl">
                          Description
                        </h2>
                        <p className="leading-7 line-clamp-7">
                          {place.description}
                        </p>
                      </>
                    )}
                    <p
                      onClick={displayDesc}
                      className={`${
                        desc
                          ? "text-black shadow-lg bg-white p-2 rounded-full fixed left-0 mx-4 top-0 hover:shadow md:mx-16 lg:mx-32 transition duration-200 ease-in-out  mt-4"
                          : "text-black underline"
                      } cursor-pointer`}
                    >
                      {desc ? <HiArrowLeft className="sm:text-2xl" /> : "View"}
                    </p>
                  </div>{" "}
                </div>
                <div className="flex flex-wrap gap-2 font-semibold">
                  <div className="flex gap-2">
                    <div>{place.maxGuests}</div> guest (max)
                  </div>
                  •
                  <div className="flex gap-2">
                    <div>{place.rooms}</div> bedrooms
                  </div>
                  •
                  <div className="flex gap-2">
                    <div>{place.bed}</div> beds
                  </div>
                </div>
              </div>
              <div>
                <BookingWidget place={place} />
              </div>
            </div>

            <div className="py-8 border-t-2">
              <Perks place={place} onClick={perk} selected={showPerks} />

              <Essentials
                place={place}
                onClick={essentials}
                selected={roomEssentials}
              />

              <EquipmentPerks
                place={place}
                selected={amenities}
                onClick={amenity}
              />

              <HouseRules place={place} selected={rules} onClick={houseRules} />

              <SafetyProperty
                place={place}
                selected={safety}
                onClick={safetyControl}
              />

              {place.extraInfo && (
                <div className="">
                  <h2 className="font-bold sm:text-2xl text-lg">Extra info</h2>
                  <div
                    className={`${
                      extraInfo
                        ? "w-full md:text-lg text-sm fixed z-40 top-0 bg-gray-100 h-full  text-black pt-16 -mx-4 px-4 md:-mx-16 md:px-16 overflow-y-scroll lg:-mx-32 lg:px-32"
                        : "truncate w-auto"
                    }  mb-4 leading-8 md:leading-10 py-2`}
                  >
                    {extraInfo && (
                      <h2 className="font-semibold sm:text-3xl text-2xl py-2">
                        Extra info
                      </h2>
                    )}
                    {place.extraInfo}
                    <p
                      onClick={setExtra}
                      className={`${
                        extraInfo
                          ? "text-black shadow-lg bg-white p-2 rounded-full fixed left-0 mx-4 top-0 hover:shadow md:mx-16 lg:mx-32 transition duration-200 ease-in-out  mt-4"
                          : "text-black underline"
                      } cursor-pointer`}
                    >
                      {extraInfo ? (
                        <HiArrowLeft className="sm:text-2xl" />
                      ) : (
                        "Show more"
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 shadow-md rounded-full hover:bg-blue-600 animate-bounce"
          >
            <p className="sm:block hidden">Back to Top</p>
            <BsArrowUpCircle className="w-full sm:hidden block" />
          </button>
        </div>
      )}
    </>
  );
}
