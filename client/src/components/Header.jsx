import { HiOutlineSearch } from "react-icons/hi";
import {
  AiOutlineClose,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useState } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Header() {
  const [premiumOffer, setPremiumOffer] = useState(false);
  const [close, setClose] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function searchFunctions() {
    setPremiumOffer((prev) => !prev);
  }

  function closeBar() {
    setClose((prev) => !prev);
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
    Swal.fire({
      icon: "success",
      title: "Logging out",
      text: "User logged out.",
      showConfirmButton: false,
      timer: 4000,
    });
  }

  return (
    <>
      {close && (
        <>
          <span
            onClick={closeBar}
            className="bg-black opacity-50 w-screen h-screen absolute"
          ></span>
          <div className="block sm:hidden relative">
            <AccountNav setClose={setClose} />
          </div>
        </>
      )}
      <header className="lg:px-32 md:px-16 px-4 py-2 flex bg-gray-700 text-white items-center justify-between">
        <Link to={"/"} className="flex items-center gap-1">
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
          <span className="text-[14px] sm:text-xl font-semibold block">
            Reserve
          </span>
        </Link>
        <div className="flex gap-2 items-center sm:shadow-sm hover:shadow-none cursor-pointer transition duration-300 ease-in-out text-[11px] sm:text-sm sm:shadow-white shadow-none sm:border sm:border-gray-300 rounded-full sm:py-2 py-0 mx-1 px-0 sm:px-4">
          <div className="hidden sm:flex">
            <div>Anywhere</div>
            <div className="border-l border-1 border-x-gray-300 ml-1 "></div>
            <div className="px-1">Any week</div>
            <div className="border-l border-1 border-gray-300 mr-1"></div>
            <div>Add guests</div>
          </div>
          <button
            className="text-white bg-primary rounded-full p-1 sm:w-auto w-[20px] cursor-pointer flex items-center justify-center"
            onClick={searchFunctions}
          >
            <HiOutlineSearch size={16} />
          </button>
        </div>
        {user && (
          <Link
            to={user ? "/account" : "/login"}
            className="sm:flex hidden gap-2 items-center shadow-md  border border-gray-300 rounded-full py-2 px-2 sm:px-4"
          >
            <AiOutlineMenu />
            <div className="sm:block hidden text-sm">Menu</div>
          </Link>
        )}

        {/* {user && (
          <div className="flex items-center gap-1 ">
            <div className="bg-gray-500 text-white rounded-full border overflow-hidden">
              <HiUser className="relative top-0.5" size={16} />
            </div>
            {!!user && <div className="text-xs">{user.name.slice(0 - 5)}</div>}
          </div>
        )} */}

        {!user && (
          <Link to="/login" className="flex items-center gap-1">
            <div>Login</div>
            <AiOutlineLogin className="" size={16} />
          </Link>
        )}

        {user && (
          <div
            onClick={logout}
            className="flex items-center gap-2 cursor-pointer group "
          >
            <div className="md:block hidden">Logout</div>
            <div className="p-1 w-auto bg-white rounded-full group-hover:bg-red-500 transition duration-300">
              <AiOutlineLogout
                className="text-red-500 group-hover:text-white"
                size={16}
              />
            </div>
          </div>
        )}
      </header>

      {!!user && (
        <div className="lg:px-32 mb-4 md:px-16 px-4 py-2 flex bg-white shadow-lg items-center justify-between">
          <div className="flex sm:flex-row sm:items-center sm:justify-around w-full flex-col gap-4">
            <p className="sm:text-2xl text-gray-500 text-sm font-bold">
              Hello,{" "}
              {!!user && (
                <span className="text-xs">{user.name.slice(0 - 5)}</span>
              )}
            </p>
            <p className="sm:text-2xl -mt-2 text-lg text-gray-700 font-bold">
              Welcome Back!
            </p>
          </div>

          <div
            onClick={closeBar}
            className="flex sm:hidden gap-2 items-center cursor-pointer shadow-md border border-gray-300 rounded-full py-2 px-2 sm:px-4"
          >
            <AiOutlineMenu />
            <div className="sm:block hidden text-sm">Menu</div>
          </div>
        </div>
      )}

      {premiumOffer && (
        <div className="relative flex justify-center">
          <div className="bg-black flex animate-bounce hover:animate-none cursor-pointer w-full items-center top-2  justify-between absolute px-4 p-2 rounded-full mx-auto ">
            <p className="text-white  ">
              Only premium users can use this search tool
            </p>
            <div className="bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out p-1  rounded-full flex items-center">
              <AiOutlineClose
                // size={26}
                onClick={() => setPremiumOffer(false)}
                className="text-white text-2xl cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
