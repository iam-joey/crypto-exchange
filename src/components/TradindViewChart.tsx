import React from "react";
import MarketBar from "./MarketBar";
import TradeView from "./TradeView";
import Trades from "./Trades";

function TradindViewChart() {
  return (
    <div className="flex flex-col flex-1 h-[650px] ">
      <MarketBar />
      <div className="h-[1px] border-b border-slate-700"></div>
      <div className="flex flex-row flex1 h-full">
        <TradeView />
        <Trades />
      </div>
    </div>
  );
}

export default TradindViewChart;
