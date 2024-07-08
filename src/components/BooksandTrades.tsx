"use client";
import React, { useState } from "react";
import Books from "./Books";
import Trades from "./Trades";

function BooksandTrades({ market }: { market: string }) {
  const [render, setRender] = useState(true);
  return (
    <div className="w-[300px] border-l border-b border-slate-700 flex flex-col ">
      <div
        className=" h-[40px] flex flex-row p-2 gap-3 border-b border-slate-700
      "
      >
        <div className="pl-3">
          <button
            className={`text-sm font-semibold ${
              render
                ? "text-gray-300 font-semibold border-b-2 border-gray-500"
                : "text-slate-500"
            } hover:border-b hover:pb-1 hover:border-blue-500`}
            onClick={() => setRender(!render)}
          >
            Books
          </button>
        </div>
        <div className="pl-4">
          <button
            className={`text-sm font-semibold ${
              !render
                ? "text-gray-300 font-semibold border-b-2 border-gray-500"
                : "text-slate-500"
            } hover:border-b hover:pb-1 hover:border-blue-500`}
            onClick={() => setRender(!render)}
          >
            Trades
          </button>
        </div>
      </div>

      {/* */}
      {render ? (
        <div className="flex flex-col">
          <TableHeader />
          <Books market={market} />
        </div>
      ) : (
        <div className="p-2 ">
          <Trades market={market} />
        </div>
      )}
    </div>
  );
}

export default BooksandTrades;

function TableHeader() {
  return (
    <div className="flex  justify-between p-2 text-xs border-t border-slate-700">
      <div>Price (USDC)</div>
      <div className="ml-3">Size (SOL)</div>
      <div className="ml-3">Total (SOL)</div>
    </div>
  );
}
