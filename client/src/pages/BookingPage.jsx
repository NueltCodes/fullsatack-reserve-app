import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import BookingDates from "../components/BookingDates";
import PlaceGallery from "../components/PlaceGallery";
import Spinner from "../components/Spinner";
import { HiArrowLeft } from "react-icons/hi";
import SafetyProperty from "../components/perks/SafetyProperty";
import HouseRules from "../components/perks/HouseRules";
import EquipmentPerks from "../components/perks/EquipmentPerks";
import Essentials from "../components/perks/Essentials";
import Perks from "../components/perks/Perks";
import { BsArrowUpCircle } from "react-icons/bs";
import { UserContext } from "../UserContext";
export default function BookingPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [showPerks, setShowPerks] = useState(false);
  const [roomEssentials, setRoomEssentials] = useState(false);
  const [amenities, setAmenities] = useState(false);
  const [rules, setRules] = useState(false);
  const [safety, setSafety] = useState(false);
  const [extraInfo, setExtraInfo] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
          setLoading(false);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

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
              "text-black md:hidden  w-9 flex justify-center items-center z-50 shadow-md bg-white p-2 rounded-full hover:shadow transition duration-200 ease-in-out cursor-pointer"
            }
          >
            <HiArrowLeft className="sm:text-2xl" />
          </div>
          <div className="my-4">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">
              {booking.place.address}
            </AddressLink>
            <div className="bg-gray-200 sm:p-6 p-2 my-6 rounded-2xl sm:flex-row flex-col gap-2 flex sm:items-center sm:justify-between">
              <div>
                <h2 className="sm:text-2xl text-sm font-bold mb-4">
                  Your booking information:
                </h2>
                <BookingDates booking={booking} />
              </div>
              <div className="bg-primary justify-center sm:p-6 p-1 flex sm:flex-col gap-2 items-center text-white rounded-2xl">
                <div className="sm:text-2xl text-lg">Total price</div>
                <div className="sm:text-3xl text-2xl border-b ">
                  ${booking.price}
                </div>
              </div>
            </div>
            <PlaceGallery place={booking.place} />

            <div className="my-4 ">
              <h2 className="font-semibold sm:text-3xl text-2xl">
                Description
              </h2>
              <p className="leading-7 ">{booking.place.description}</p>
            </div>

            <div className="py-8 border-t-2">
              <Perks
                place={booking.place}
                onClick={perk}
                selected={showPerks}
              />

              <Essentials
                place={booking.place}
                onClick={essentials}
                selected={roomEssentials}
              />

              <EquipmentPerks
                place={booking.place}
                selected={amenities}
                onClick={amenity}
              />

              <HouseRules
                place={booking.place}
                selected={rules}
                onClick={houseRules}
              />

              <SafetyProperty
                place={booking.place}
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
                  {booking.place.extraInfo}
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
