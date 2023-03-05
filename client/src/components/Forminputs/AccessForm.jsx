import React from "react";

export default function AccessForm({ selected, onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <div>
      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <label className="border-2  p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("Kitchen")}
            name="Kitchen"
            onChange={handleCbClick}
          />
          <span className="md:text-2xl text-[15px]">Kitchen</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("Laundry - washer")}
            name="Laundry - washer"
            onChange={handleCbClick}
          />
          <span className="md:text-2xl text-[15px]">Laundry - washer</span>
        </label>

        <label className="border-2 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("Laundry - dryer")}
            name="Laundry - dryer"
            onChange={handleCbClick}
          />
          <span className="md:text-2xl text-[15px]">Laundry - dryer</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("Parking")}
            name="Parking"
            onChange={handleCbClick}
          />
          <span className="md:text-2xl text-[15px]">Parking</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("Gym")}
            name="Gym"
            onChange={handleCbClick}
          />
          <span className="md:text-2xl text-[15px]">Gym</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("Pool")}
            name="Pool"
            onChange={handleCbClick}
          />
          <span className="md:text-2xl text-[15px]">Pool</span>
        </label>

        <label className="border-2 md:p-4 p-2 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("Hot tub")}
            name="Hot tub"
            onChange={handleCbClick}
          />
          <span className="md:text-2xl text-[15px]">Hot tub</span>
        </label>
      </div>
    </div>
  );
}
