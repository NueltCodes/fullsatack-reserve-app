import React from "react";

export default function Perks({ place, onClick, selected }) {
  return (
    <div>
      {" "}
      <div className="py-4 border-b-2">
        <h2 className="font-bold sm:text-2xl text-lg">Perks</h2>
        {place.perks.length < 1 && (
          <h2 className="sm:font-bold font-medium sm:text-lg text-gray-600 text-sm flex justify-center mt-2">
            No perks available for this space for now
          </h2>
        )}
        <div className="text-lg py-2">
          <div className="flex flex-col gap-2">
            {place.perks.slice(0, 4).map((perks, index) => (
              <p key={index}>{perks}</p>
            ))}
          </div>
          <div
            className={` ${
              selected ? "text-lg flex flex-col gap-2 pt-2" : "hidden"
            }`}
          >
            {place.perks.slice(4, 6).map((perks, index) => (
              <p key={index}>{perks}</p>
            ))}{" "}
          </div>
        </div>
        {place.perks.length > 4 && (
          <p onClick={onClick} className="text-black underline cursor-pointer">
            {selected ? "Less view" : "Show more"}
          </p>
        )}
      </div>
    </div>
  );
}
