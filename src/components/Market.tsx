import Image from "next/image";
import React from "react";

function Market() {
  return (
    <div className={`flex flex-col gap-2`}>
      <p className="text-gray-500 text-sm">Order Value</p>
      <InputUSDC />
      <Buttons />
      <div className="mt-2">
        <button className="bg-white w-full p-2 text-black rounded-lg font-semibold">
          Trade
        </button>
      </div>
    </div>
  );
}

export default Market;

export function InputUSDC() {
  return (
    <div className="flex flex-row border border-slate-600 p-2 rounded-lg focus-within:border-blue-900 gap-2">
      <input
        type="text"
        className="w-full p-1 rounded-md rtl text-right bg-transparent focus:outline-none"
        placeholder="0"
      />
      <Image src="../usdc.svg" width={25} height={25} alt="USDC logo" />
    </div>
  );
}

export function Buttons() {
  return (
    <div className=" flex flex-row gap-2 justify-around">
      <button className=" rounded-lg text-xs px-3 py-1 bg-slate-800 hover:bg-slate-600">
        25%
      </button>
      <button className=" rounded-lg text-xs px-3 py-1 bg-slate-800 hover:bg-slate-600">
        50%
      </button>
      <button className=" rounded-lg text-xs px-3 py-1 bg-slate-800 hover:bg-slate-600">
        75%
      </button>
      <button className=" rounded-lg text-xs px-3 py-1 bg-slate-800 hover:bg-slate-600">
        max
      </button>
    </div>
  );
}
