import React from "react";

function MarketBar() {
  return (
    <div
      className="h-[66px] p-2 flex flex-row items-center gap-3
  "
    >
      <div className="text-lg cursor-pointer hover:text-gray-300 font-semibold mx-5">
        SOL/USDC
      </div>
      <div className="flex flex-col gap-0 ml-3 items-center font-semibold">
        <p className="text-green-400 text-sm">142.81</p>
        <p className="text-xs">$142.81</p>
      </div>
      <div className="flex flex-col items-center ml-3 gap-0">
        <p className="text-xs text-gray-400">24H Change</p>
        <p className="text-green-500">+7.42 +5.49%</p>
      </div>
      <div className="flex flex-col items-center ml-3 gap-0">
        <p className="text-xs text-gray-400">24H High</p>
        <p className="">143.47</p>
      </div>
      <div className="flex flex-col items-center ml-3 gap-0">
        <p className="text-xs text-gray-400">24H Low</p>
        <p className="">143.23</p>
      </div>
      <div className="flex flex-col items-center ml-3 gap-0">
        <p className="text-xs text-gray-400">24H Volume (USDC)</p>
        <p className="">4,772,954.68</p>
      </div>
    </div>
  );
}

export default MarketBar;
