import SwapUi from "@/components/SwapUi";
import TradindViewChart from "@/components/TradindViewChart";
import React from "react";

function page() {
  return (
    <div className="flex flex-row flex-1">
      <div className="flex-1">
        <TradindViewChart />
      </div>
      <div className="w-[1px] flex-col border-slate-800 border-l"></div>
      <div className="flex  w-[300px] ">
        <SwapUi />
      </div>
    </div>
  );
}

export default page;
