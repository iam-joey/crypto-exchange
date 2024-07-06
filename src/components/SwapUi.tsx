import React from "react";
// import Limit from "./Limit";
import Market from "./Market";

function SwapUi() {
  return (
    <div
      className="flex flex-col  w-full
  "
    >
      <div className="flex flex-col">
        <div className="h-[60px]   flex flex-row ">
          <BuyButton />
          <SellButton />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-3 p-2 items-center">
            <div className="">
              <button className="text-sm hover:border-b-2 hover:border-blue-500 hover:pb-[2px]">
                Limit
              </button>
            </div>
            <div className=" ">
              <button className="text-sm hover:border-b-2 hover:border-blue-500 hover:pb-[2px]">
                Market
              </button>
            </div>
          </div>
          <div className="border-b border-slate-900"></div>
          <div
            className="flex flex-row justify-between p-2 items-center
          "
          >
            <p className="text-xs text-gray-500">Available Balance</p>
            <p className="text-xs">0.00USDC</p>
          </div>
          <div className="p-2">
            <Market />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapUi;

function SellButton() {
  return (
    <div className="flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 border-b-baseBorderMed hover:border-b-baseBorderFocus bg-redBackgroundTransparent border-b-redBorder">
      <p className="text-center text-sm font-semibold leading-[60px] text-red-900 hover:bg-red-400">
        Sell
      </p>
    </div>
  );
}

function BuyButton() {
  return (
    <div className="flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 border-b-greenBorder bg-greenBackgroundTransparent">
      <p className="text-center text-sm font-semibold leading-[60px] text-green-900 hover:bg-green-400">
        Buy
      </p>
    </div>
  );
}
