import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLeftSquare } from "react-icons/ai";
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
      setLoading(false);
    });
  }, [id]);

  if (!place) return "";

  function setExtra() {
    setExtraInfo((prev) => !prev);
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-4 lg:px-32 md:px-16 mx-auto overflow-hidden min-h-screen">
          <div
            onClick={() => navigate(-1)}
            className={
              "text-black w-9 flex justify-center items-center z-50 shadow-md bg-white p-2 rounded-full hover:shadow transition duration-200 ease-in-out cursor-pointer"
            }
          >
            <HiArrowLeft className="sm:text-2xl" />
          </div>
          <div className="pt-2">
            <h1 className="sm:text-3xl text-2xl font-semibold">
              {place.title}
            </h1>
            <AddressLink>{place.address}</AddressLink>

            <PlaceGallery place={place} />
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 sm:grid-cols-[2fr_1fr] ">
              <div>
                <div className="my-4 ">
                  <h2 className="font-semibold sm:text-3xl text-2xl">
                    Description
                  </h2>
                  <p className="leading-7 ">{place.description}</p>
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

              <div className="">
                <h2 className="font-bold sm:text-2xl text-lg">Extra info</h2>
                <div
                  className={`${
                    extraInfo
                      ? "w-full md:text-lg text-sm fixed top-0 bg-gray-100 h-full  text-black pt-16 -mx-4 px-4 md:-mx-16 md:px-16 overflow-y-scroll lg:-mx-32 lg:px-32"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
