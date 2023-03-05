import React from "react";

export default function BedroomForm({ selected, onChange }) {
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
      <h2 className="md:text-2xl mt-8 font-semibold text-white text-[17px]">
        Bedroom and laundry
      </h2>
      <p className="text-gray-300 text-sm">
        Select all available services / equipment available you have
      </p>

      <div className="grid mt-2 gap-6 md:gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-gray-300">
        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Bath tub")}
            name="Bath tub"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Bath tub</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Hanger")}
            name="Hanger"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Hanger</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Hair dryer")}
            name="Hair dryer"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Hair dryer</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Bed lines")}
            name="Bed lines"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Bed lines</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Shower gel")}
            name="Shower gel"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Shower gel</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Cleaning Products")}
            name="Cleaning Products"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Cleaning Products</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Shampoo")}
            name="Shampoo"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Shampoo</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Iron")}
            name="Iron"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Iron</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Outdoor shower")}
            name="Outdoor shower"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Outdoor shower</span>
        </label>
      </div>
    </div>
  );
}
