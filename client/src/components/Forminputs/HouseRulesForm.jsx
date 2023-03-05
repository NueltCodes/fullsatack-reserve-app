import React from "react";

export default function HouseRulesForm({
  rules1,
  rules2,
  rules3,
  rules4,
  rules5,
  setRules1,
  setRules2,
  setRules3,
  setRules4,
  setRules5,
}) {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-2xl px-4 mt-8 py-2 lg:items-center lg:flex lg:flex-col w-full ">
      <div className="text-center lg:py-2">
        <h2 className="md:text-2xl lg:text-3xl mt-2 font-semibold text-[15px] text-white">
          House Rules
        </h2>
        <p className="text-white text-sm">Select all the perks of your place</p>
      </div>

      <div className="grid gap-4 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6">
        <div>
          <p className="text-white text-[16px]">Smoking allowed</p>
          <input
            type="text"
            required
            value={rules1}
            placeholder="Yes/No"
            onChange={(e) => setRules1(e.target.value)}
            className="w-auto border border-gray-500 my-1 py-2 px-3 rounded-2xl inputText"
          />
        </div>

        <div>
          <p className="text-white text-[16px]">Event allowed</p>
          <input
            type="text"
            required
            value={rules2}
            placeholder="Yes/No"
            onChange={(e) => setRules2(e.target.value)}
            className="w-auto border border-gray-500 my-1 py-2 px-3 rounded-2xl inputText"
          />
        </div>

        <div>
          <p className="text-white text-[16px]">Suitable for pets</p>
          <input
            type="text"
            required
            value={rules3}
            placeholder="Yes/No"
            onChange={(e) => setRules3(e.target.value)}
            className="w-auto border border-gray-500 my-1 py-2 px-3 rounded-2xl inputText"
          />
        </div>

        <div>
          <p className="text-white text-[16px]">
            Suitable for children (above 2-12 yrs)
          </p>
          <input
            type="text"
            required
            value={rules4}
            placeholder="Yes/No"
            onChange={(e) => setRules4(e.target.value)}
            className="w-auto border border-gray-500 my-1 py-2 px-3 rounded-2xl inputText"
          />
        </div>

        <div>
          <p className="text-white text-[16px]">
            Suitable for infant (under 2 yrs) ?
          </p>
          <input
            type="text"
            required
            value={rules5}
            placeholder="Yes/No"
            onChange={(e) => setRules5(e.target.value)}
            className="w-auto border border-gray-500 my-1 py-2 px-3 rounded-2xl inputText"
          />
        </div>
      </div>
    </div>
  );
}
