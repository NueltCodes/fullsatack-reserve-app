import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import {
  AiFillLeftCircle,
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineLogout,
  AiOutlineRight,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsHeartFill, BsHouseDoor } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function AccountNav({ setClose }) {
  const { pathname } = useLocation();
  const params = useParams();
  const { id } = params;
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const pathRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
    Swal.fire({
      icon: "success",
      title: "Logging out",
      text: "User logged out.",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  function closeBar() {
    setClose((prev) => !prev);
  }
  console.log(pathname);

  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <nav
        className={`${
          pathRoute(`/account/places/${id}`) || pathRoute(`/account/places/new`)
            ? "sm:w-full w-[70%] sm:bg-blue-800 bg-black sm:relative transform fixed z-50 flex-col sm:flex-row overflow-x-scroll flex sm:h-auto h-screen sm:justify-center sm:items-center pt-12 sm:mt-2 gap-2 sm:mb-8 whitespace-nowrap"
            : "sm:w-full w-[70%] bg-red sm:bg-blue-800 bg-blue-800 sm:relative transform fixed z-50 flex-col sm:flex-row overflow-x-scroll sm:gap-4 flex sm:h-auto h-screen sm:justify-center sm:items-center pt-12 sm:mt-2 sm:mb-8 whitespace-nowrap "
        }`}
      >
        <AiOutlineLeft
          onClick={() => handleClick("left")}
          size={45}
          className="text-white hover:bg-blue-300 hover:bg-opacity-30 rounded-full cursor-pointer hidden sm:block"
        />
        <div
          ref={rowRef}
          className="sm:flex flex-row  items-center scrollbar-hide  sm:gap-40  overflow-x-scroll pb-2"
        >
          <Link
            to={"/"}
            onClick={closeBar}
            className="flex sm:hidden items-center gap-1 absolute top-2 pl-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 sm:w-9 sm:h-9 -rotate-90 animate-pulse text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <span className="text-lg text-white sm:text-xl font-semibold block">
              Reserve
            </span>
          </Link>

          <Link
            to={"/"}
            onClick={closeBar}
            className={`mt-6 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center  ${
              pathRoute("/")
                ? "sm:pl-none pl-10 bg-[#9cb4e199] bg-opacity-50 sm:text-white text-white transition duration-300 ease-in-out"
                : "pl-3 hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
            }`}
          >
            <MdDashboard size={20} />
            <div>Home</div>
          </Link>

          <Link
            to={"/account"}
            onClick={closeBar}
            className={`mt-6 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center   ${
              pathRoute("/account")
                ? "sm:pl-none pl-10 bg-[#9cb4e199] bg-opacity-50 sm:text-white text-white transition duration-300 ease-in-out"
                : "pl-3 hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
            }`}
          >
            <HiOutlineUser size={20} />
            <div className="">Profile</div>
          </Link>

          <Link
            to={"/account/bookings"}
            onClick={closeBar}
            className={`mt-6 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6  sm:rounded-full sm:justify-center  ${
              pathRoute("/account/bookings")
                ? "sm:pl-none pl-10 bg-[#9cb4e199] bg-opacity-50  border sm:text-white text-white transition duration-300 ease-in-out"
                : "pl-3 hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg  text-gray-300 transition duration-300 ease-in-out "
            }`}
          >
            <AiOutlineUnorderedList size={20} />
            <div>Booked places</div>
          </Link>

          <Link
            to={"/account/places"}
            onClick={closeBar}
            className={`mt-6 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center  ${
              pathRoute("/account/places")
                ? "sm:pl-none pl-10 bg-[#9cb4e199] bg-opacity-50 sm:text-white text-white transition duration-300 ease-in-out"
                : "pl-3 hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
            }`}
          >
            <BsHouseDoor size={20} />
            <div>Created places</div>
          </Link>

          <Link
            to={"/account/favorites"}
            onClick={closeBar}
            className={`mt-6 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center  ${
              pathRoute("/account/favorites")
                ? "sm:pl-none pl-10 bg-[#9cb4e199] bg-opacity-50 sm:text-white text-white transition duration-300 ease-in-out"
                : "pl-3 hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
            }`}
          >
            <BsHeartFill
              className={`  ${
                pathRoute("/account/favorites")
                  ? "text-white"
                  : "text-red-500 text-opacity-90"
              }`}
              size={20}
            />
            <div>Favorites</div>
          </Link>

          {!!user ? (
            <div
              onClick={() => {
                logout();
                closeBar();
              }}
              className={`mt-8 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center cursor-pointer ${
                pathRoute("/login")
                  ? "sm:pl-none pl-10 bg-[#9cb4e199] bg-opacity-50 sm:text-white text-white transition duration-300 ease-in-out"
                  : "pl-3 hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
              }`}
            >
              <div className="p-1 w-auto bg-white rounded-full group-hover:bg-red-500 transition duration-300">
                <AiOutlineLogout
                  className="text-red-500 group-hover:text-white"
                  size={16}
                />
              </div>
              <div>Log out</div>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeBar}
              className={`mt-8 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center cursor-pointer ${
                pathRoute("/login")
                  ? "sm:pl-none pl-10 bg-[#9cb4e199] bg-opacity-50 sm:text-white text-white transition duration-300 ease-in-out"
                  : "pl-3 hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
              }`}
            >
              <div className="p-1 w-auto bg-white rounded-full group-hover:bg-red-500 transition duration-300">
                <AiOutlineLogout
                  className="text-red-500 group-hover:text-white"
                  size={16}
                />
              </div>
              <div>Log in</div>
            </Link>
          )}

          <div
            onClick={closeBar}
            className="block sm:hidden text-red-500 absolute right-0 top-2 mr-4 bg-gray-200 hover:bg-white cursor-pointer p-1 rounded-full transition duration-200 ease-in-out"
          >
            <AiOutlineClose size={22} />
          </div>
        </div>

        <AiOutlineRight
          onClick={() => handleClick("right")}
          size={45}
          className="text-white hover:bg-blue-300 hover:bg-opacity-30 rounded-full cursor-pointer hidden sm:block"
        />
      </nav>
    </div>
  );
}
