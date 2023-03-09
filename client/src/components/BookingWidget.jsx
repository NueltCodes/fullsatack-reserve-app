import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Link, useNavigate } from "react-router-dom";
export default function BookingWidget({ place }) {
  const [bookingLoading, setBookingLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [link, setLink] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setBookingLoading(false);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  // async function bookPlace() {
  //   if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
  //     setErrorMessage("Please fill in all fields before booking.");
  //     return;
  //   }
  //   const Booking = {
  //     checkIn,
  //     checkOut,
  //     numberOfGuests,
  //     name,
  //     phone,
  //     place: place._id,
  //     price: numberOfNights * place.price,
  //   };
  //   const response = await axios.post("/bookings", Booking);
  //   const bookingId = response.data._id; // extracted the booking ID from the response

  //   Swal.fire({
  //     icon: "success",
  //     title: "Booking successful",
  //     text: "Thank you for booking with us!",
  //     showConfirmButton: false,
  //     timer: 4000, // close the pop-up after 4 seconds
  //   });
  //   setLink(true);

  //   // Reset the state variables to their initial values
  //   setCheckIn("");
  //   setCheckOut("");
  //   setNumberOfGuests(1);
  //   setName("");
  //   setPhone("");
  //   navigate(`/account/bookings/${bookingId}`);
  // }

  async function bookPlace() {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000); // reset the button after 1 second
    if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
      setErrorMessage("Please fill in all fields before booking.");
      return;
    }
    const Booking = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    };
    const response = await axios.post("/bookings", Booking);
    const bookingId = response.data._id; // extracted the booking ID from the response

    Swal.fire({
      icon: "success",
      title: "Booking successful",
      text: "Thank you for booking with us!",
      showConfirmButton: false,
      timer: 4000, // close the pop-up after 4 seconds
    });
    setLink(true);

    // Reset the state variables to their initial values
    setCheckIn("");
    setCheckOut("");
    setNumberOfGuests(1);
    setName("");
    setPhone("");
    navigate(`/account/bookings/${bookingId}`);
  }

  return (
    <div
      className="bg-white shadow p-4
   rounded-2xl"
    >
      {errorMessage && (
        <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-2 mt-4 rounded">
          {errorMessage}
        </div>
      )}

      <div className="sm:text-2xl text-lg font-semibold bg-slate-600  text-white text-center py-2">
        ${place.price}/per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex sm:flex-row flex-col sm:justify-center items-center">
          <div className="py-3 px-4">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l ">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-l">
          <label>Number of guest: (max {place.maxGuests})</label>
          <input
            type="number"
            value={numberOfGuests}
            max={place.maxGuests}
            min={1}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            className="inputText"
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t flex-col">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full  py-2 px-3 rounded-lg inputText"
            />
            <label>
              Phone number:{" "}
              <span className="text-sm text-gray-500">+1, +234, +444 etc.</span>{" "}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="inputText"
            />
          </div>
        )}
      </div>
      <button
        onClick={bookPlace}
        className={` border-none
        ${
          isClicked
            ? "button-clicked w-full"
            : "primary mt-4 flex justify-center items-center"
        }`}
      >
        {bookingLoading ? (
          <div className="w-9 h-9  border-2  border-b-green-400 border-l-white border-t-green-400 border-r-green-400 border-solid rounded-full animate-spin"></div>
        ) : (
          <>
            Book this place
            {numberOfNights > 0 && (
              <>
                <span> ${numberOfNights * place.price}</span>
              </>
            )}
          </>
        )}
      </button>
    </div>
  );
}
