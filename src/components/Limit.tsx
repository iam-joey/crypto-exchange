import React from "react";
import { Buttons, InputUSDC } from "./Market";

function Limit() {
  return (
    <div className=" flex flex-col gap-2  p-1">
      <div className="flex flex-col gap-1 items-start">
        <span className="text-xs text-gray-500">Price</span>
        <InputUSDC />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <span
          className="text-xs text-gray-500 
        "
        >
          Quantity
        </span>
        <InputUSDC />
      </div>
      <div className="p-1">
        <Buttons />
      </div>
      <div>
        <button className="bg-white w-full p-2 text-black rounded-lg font-semibold">
          Trade
        </button>
      </div>
    </div>
  );
}

export default Limit;
