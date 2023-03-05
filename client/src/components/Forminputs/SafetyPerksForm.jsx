import React from "react";

export default function SafetyPerksForm({ selected, onChange }) {
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
        Safety Perks
      </h2>
      <p className="text-gray-300 text-sm">
        Select the safety equipment your place have
      </p>
      <div className="grid mt-2 gap-6 md:gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-gray-300">
        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Smoke detector")}
            name="Smoke detector"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Smoke detector</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Carbon monoxide detector")}
            name="Carbon monoxide detector"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">
            Carbon monoxide detector
          </span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("First aid kit")}
            name="First aid kit"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">First aid kit</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Fire exstinguisher")}
            name="Fire exstinguisher"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Fire exstinguisher</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer w-auto">
          <input
            type="checkbox"
            checked={selected.includes("Locks on all doors")}
            name="Locks on all doors"
            onChange={handleCbClick}
          />
          <span className="md:text-md text-[15px]">Locks on all doors</span>
        </label>
      </div>
    </div>
  );
}
