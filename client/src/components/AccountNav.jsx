import React from "react";
import { AiOutlineClose, AiOutlineUnorderedList } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";

export default function AccountNav({ setClose }) {
  const { pathname } = useLocation();
  const params = useParams();
  const { id } = params;
  const pathRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  function closeBar() {
    setClose((prev) => !prev);
  }
  console.log(pathname);
  return (
    <div className="relative">
      <nav
        className={`${
          pathname === `/account/places/${id}` ||
          pathname === `/account/places/new`
            ? "sm:w-full w-[70%] bg-black sm:relative transform fixed z-50 flex-col sm:flex-row sm:flex-wrap flex sm:h-auto h-screen sm:justify-center sm:items-center pt-12 sm:mt-2 gap-2 sm:mb-8"
            : "sm:w-full w-[70%] bg-black sm:bg-white sm:relative transform fixed z-50 flex-col sm:flex-row sm:flex-wrap sm:gap-4 flex sm:h-auto h-screen sm:justify-center sm:items-center pt-12 sm:mt-2 sm:mb-8"
        }`}
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
          className={`mt-2 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center  ${
            pathRoute("/")
              ? "sm:pl-none pl-8 bg-[#f5385d] sm:text-white text-white transition duration-300 ease-in-out"
              : "hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
          }`}
        >
          <MdDashboard size={20} />
          <div>Home</div>
        </Link>

        <Link
          to={"/account"}
          onClick={closeBar}
          className={`mt-2 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center  ${
            pathRoute("/account")
              ? "sm:pl-none pl-8 bg-[#f5385d] sm:text-white text-white transition duration-300 ease-in-out"
              : "hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
          }`}
        >
          <HiOutlineUser size={20} />
          <div>My profile</div>
        </Link>

        <Link
          to={"/account/bookings"}
          onClick={closeBar}
          className={`mt-2 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center  ${
            pathRoute("/account/bookings")
              ? "sm:pl-none pl-8 bg-[#f5385d] sm:text-white text-white transition duration-300 ease-in-out"
              : "hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
          }`}
        >
          <AiOutlineUnorderedList size={20} />
          <div>My bookings</div>
        </Link>

        <Link
          to={"/account/places"}
          onClick={closeBar}
          className={`mt-2 flex items-center gap-1 sm:py-2 sm:my-0 my-2 py-2 px-2 sm:px-6 sm:rounded-full sm:justify-center  ${
            pathRoute("/account/places")
              ? "sm:pl-none pl-8 bg-[#f5385d] sm:text-white text-white transition duration-300 ease-in-out"
              : "hover:text-white sm:hover:text-black sm:hover:shadow-md sm:bg-white sm:text-black sm:shadow-lg text-gray-300 transition duration-300 ease-in-out"
          }`}
        >
          <BsHouseDoor size={20} />
          <div>My accommodations</div>
        </Link>
        <div
          onClick={closeBar}
          className="block sm:hidden text-red-500 absolute right-0 top-2 mr-4 bg-gray-200 hover:bg-white cursor-pointer p-1 rounded-full transition duration-200 ease-in-out"
        >
          <AiOutlineClose size={22} />
        </div>
      </nav>
    </div>
  );
}
