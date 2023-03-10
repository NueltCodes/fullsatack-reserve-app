import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function HouseRules({ place, onClick, selected }) {
  return (
    <div className="">
      <div className="py-4 border-b-2">
        <h2 className="font-bold sm:text-2xl text-lg">House rules</h2>
        <div className="text-lg py-2">
          <div className="flex gap-2">
            <div>{place.maxGuests}</div> guest maximum
          </div>
          <div className="flex gap-2">
            <p>Check-in-time after</p>
            <div>{place.checkIn} am</div>
          </div>
          <div className="flex gap-2">
            <p>Check-out-time before</p>
            <div>{place.checkOut} pm </div>
          </div>

          <p
            onClick={onClick}
            className={`${!selected && "text-black underline cursor-pointer"} `}
          >
            {!selected && "Show more"}
          </p>
        </div>

        <div className="flex flex-col items-center">
          {selected && (
            <div className="w-auto h-auto flex flex-col justify-center items-center md:text-lg text-sm fixed z-40 top-10 bg-gray-100 text-black -mx-4 px-8 py-20 md:-mx-16 md:px-16 overflow-y-scroll lg:-mx-32 lg:px-32">
              <h2 className="font-semibold sm:text-3xl text-2xl pb-4 sm:pb-8  text-red-600 underline">
                House rules
              </h2>
              <div className="sm:text-lg font-semibold sm:font-bold flex flex-col gap-4 text-sm py-4">
                <div className="flex gap-2 items-baseline">
                  <span className="bg-red-500  rounded-full p-1 w-1 h-1"></span>
                  <div>{place.maxGuests}</div> guest maximum
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="bg-red-500  rounded-full p-1 w-1 h-1"></span>
                  <p>Check-in-time after</p>
                  <div>{place.checkIn} am</div>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="bg-red-500  rounded-full p-1 w-1 h-1"></span>
                  <p>Check-out-time before</p>
                  <div>{place.checkOut} pm </div>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="bg-red-500  rounded-full p-1 w-1 h-1"></span>
                  <p>Is smoking allowed ?</p>
                  <div>{place.rules1}</div>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="bg-red-500  rounded-full p-1 w-1 h-1"></span>
                  <p>Are event / parties allowed ?</p>
                  <div>{place.rules2}</div>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="bg-red-500  rounded-full p-1 w-1 h-1"></span>
                  <div>{place.rules3}</div>
                  <p>pets are allowed</p>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="bg-red-500  rounded-full p-1 w-1 h-1"></span>
                  <p>Suitable for children (above 2-12 yrs) ?</p>
                  <div>{place.rules4}</div>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="bg-red-500  rounded-full p-1 w-1 h-1"></span>
                  <p>Suitable for infant (under 2 yrs) ?</p>
                  <div>{place.rules5}</div>
                </div>
              </div>
              <p
                onClick={onClick}
                className={`${
                  selected
                    ? "text-red-600 shadow-lg bg-white hover:bg-red-600 hover:text-white p-2 rounded-full absolute top-0 left-0 hover:shadow mx-8 transition duration-200 ease-in-out mt-4"
                    : "text-black underline"
                } cursor-pointer`}
              >
                {selected ? (
                  <AiOutlineClose size={20} className="sm:text-2xl" />
                ) : (
                  "Show more"
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
