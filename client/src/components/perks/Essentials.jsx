import React from "react";

export default function Essentials({ place, onClick, selected }) {
  return (
    <div>
      <div className="py-4 border-b-2">
        <h2 className="font-bold sm:text-2xl text-lg">Essentials</h2>
        {place.roomPerks.length < 1 && (
          <h2 className="sm:font-bold font-medium sm:text-lg text-gray-600 text-sm flex justify-center mt-2">
            No Essentials available for this space for now
          </h2>
        )}
        <div className="text-lg py-2">
          <div className="flex flex-col gap-2">
            {place.roomPerks.slice(0, 4).map((perks, index) => (
              <p key={index}>{perks}</p>
            ))}
          </div>
          <div
            className={` ${
              selected ? "text-lg flex flex-col gap-2 pt-2" : "hidden"
            }`}
          >
            {place.roomPerks.slice(4, 9).map((perks, index) => (
              <p key={index}>{perks}</p>
            ))}
          </div>
        </div>
        {place.roomPerks.length > 4 && (
          <p onClick={onClick} className="text-black underline cursor-pointer">
            {selected ? "Less view" : "Show more"}
          </p>
        )}
      </div>
    </div>
  );
}
