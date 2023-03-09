import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import BookingDates from "../components/BookingDates";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { HiArrowLeft } from "react-icons/hi";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BsArrowUpCircle } from "react-icons/bs";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (booking) => {
    axios
      .delete(`/bookings/${booking._id}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Booking deleted",
          text: "Your booking has been cleared.",
          showConfirmButton: false,
          timer: 4000,
        });

        setBookings(bookings.filter((b) => b._id !== booking._id));
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: "Failed to delete booking. Please try again later.",
        });
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-4 lg:px-32 md:px-16 mx-auto overflow-hidden min-h-screen">
          {" "}
          <div className="sm:block hidden">
            <AccountNav />
          </div>
          <div
            onClick={() => navigate("/")}
            className={
              "text-black w-9 sm:hidden flex justify-center items-center z-50 shadow-md bg-white p-2 rounded-full hover:shadow transition duration-200 ease-in-out cursor-pointer"
            }
          >
            <HiArrowLeft className="sm:text-2xl" />
          </div>
          <h1 className="sm:hidden flex justify-center items-center bg-[#f5385d] p-2 mb-4 w-auto mx-auto my-3 text-white font-bold rounded-2xl">
            Your Booked apartment
          </h1>
          <div className="">
            {bookings?.length > 0 &&
              bookings.map((booking) =>
                booking.place ? (
                  <Link
                    key={booking._id}
                    to={`/account/bookings/${booking._id}`}
                    className="sm:flex-row flex-col flex mb-4 gap-4 bg-gray-200 rounded-2xl overflow-hidden"
                  >
                    <div className="sm:w-48 w-full">
                      <PlaceImg place={booking.place} />
                    </div>
                    <div className="py-3 p-2 pr-3 grow">
                      <h2 className="sm:text-2xl text-xl font-semibold">
                        {booking.place.title}
                      </h2>
                      <div className="text-xl">
                        <BookingDates
                          booking={booking}
                          className="mb-2 mt-4 text-gray-500"
                        />
                        <div className="flex gap-1">
                          <span className="sm:text-2xl text-lg">
                            Total price: ${booking.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    key={booking._id}
                    to={`/account/bookings/${booking._id}`}
                    className="sm:flex-row flex-col flex mb-4 gap-4 bg-gray-200 rounded-2xl overflow-hidden"
                  >
                    <div className="sm:w-48 w-full">
                      <PlaceImg place={booking.place} />
                    </div>
                    <div className="py-3 p-2 pr-3 grow">
                      <div className="sm:text-2xl text-xl font-semibold">
                        {!booking.place?.title && (
                          <div>
                            <span className="text-red-500">Note:</span>{" "}
                            <p className="sm:text-2xl text-lg font-bold grid gap-8 grid-cols-1 sm:grid-cols-[2fr_1fr]">
                              {" "}
                              This spaces has been removed by its owner, Do
                              click the delete button to clear it out.
                              <button
                                className="primary"
                                type="button"
                                onClick={() => handleDelete(booking)}
                              >
                                Delete booking
                              </button>
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-xl">
                        <BookingDates
                          booking={booking}
                          className="mb-2 mt-4 text-gray-500"
                        />
                        <div className="flex gap-1">
                          <span className="sm:text-2xl text-lg">
                            Total price: ${booking.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
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
