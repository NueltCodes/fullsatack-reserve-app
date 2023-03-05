import React from "react";

export default function OtherSpaceForm({ selected, onChange }) {
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
        Other spaces
      </h2>
      <p className="text-gray-300 text-sm">
        Select all available services / equipment available you have
      </p>
      <div className="grid mt-2 md:gap-10 gap-6 sm:grid-cols-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-gray-300">
        <label className="border-2  p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Kitchen")}
            name="Kitchen"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Kitchen</span>
        </label>

        <div className="border-2 p-2 md:w-auto w-full rounded-2xl cursor-pointer ">
          <label className="gap-2 flex  items-center ">
            <input
              type="checkbox"
              checked={selected.includes("Parking")}
              name="Parking"
              onChange={handleCbClick}
            />
            <span className="md:text-md text-[15px]">Parking</span>
          </label>
        </div>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Gym")}
            name="Gym"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Gym</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Pool")}
            name="Pool"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Pool</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Laundry - washer")}
            name="Laundry - washer"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Laundry - washer</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Laundry - dryer")}
            name="Laundry - dryer"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Laundry - dryer</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Hot tub")}
            name="Hot tub"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Hot tub</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer md:w-auto w-full">
          <input
            type="checkbox"
            checked={selected.includes("Desk/workspace")}
            name="Desk/workspace"
            onChange={handleCbClick}
          />
          <span className="md:text-md w-auto text-[15px]">
            Desk / workspace
          </span>
        </label>
      </div>
    </div>
  );
}
