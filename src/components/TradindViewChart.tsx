import React from "react";
import MarketBar from "./MarketBar";
import TradeView from "./TradeView";
import BooksandTrades from "./BooksandTrades";

function TradindViewChart({ market }: { market: string }) {
  return (
    <div className="flex flex-col flex-1 h-[650px] ">
      <MarketBar market={market} />
      <div className="h-[1px] border-b border-slate-700"></div>
      <div className="flex flex-row h-full ">
        <TradeView />
        <BooksandTrades market={market} />
      </div>
    </div>
  );
}

export default TradindViewChart;
