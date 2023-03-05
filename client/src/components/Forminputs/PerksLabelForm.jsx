import React from "react";

export default function PerksLabelForm({ selected, onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <div className="">
      <h2 className="md:text-2xl mt-4 font-semibold text-white text-[17px]">
        Perks
      </h2>
      <p className="text-gray-300 text-sm">
        Select all the perks of your place
      </p>
      <div className="grid mt-2 md:gap-10 gap-6 sm:grid-cols-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-gray-300">
        <label className="border-2  p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("wi-Fi")}
            name="wi-Fi"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Wi-Fi</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Private entrance")}
            name="Private entrance"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Private entrance</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Tv")}
            name="Tv"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Tv</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Air condition")}
            name="Air condition"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Air condition</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer  md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Heater")}
            name="Heater"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Heater</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer  md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Fireplace")}
            name="Fireplace"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Fireplace</span>
        </label>
      </div>
    </div>
  );
}
