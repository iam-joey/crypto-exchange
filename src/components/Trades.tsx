"use client";
import { getTrades } from "@/utils/client";
import { getTimer } from "@/utils/helper";
import { Trade } from "@/utils/types";
import { WebSocketManager } from "@/utils/webSocket";
import React, { useEffect, useState } from "react";

function Trades({ market }: { market: string }) {
  return (
    <div className="p-1 ">
      <TableHeader />
      <TableData market={market} />
    </div>
  );
}

export default Trades;

function TableHeader() {
  return (
    <div className="flex text-slate-600 items-center mb-2">
      <div className="text-xs  px-2 font-bold">Price (USDC)</div>
      <div className="text-xs font-bold pl-10">Qty (SOL)</div>
    </div>
  );
}

function TableData({ market }: { market: string }) {
  const [data, setData] = useState<Partial<Trade>[]>([]);

  const call = async () => {
    let vals = await getTrades(market);
    setData(vals.slice(0, 25));
  };

  useEffect(() => {
    call();
    WebSocketManager.getInstance().registerCallBack(
      "trade",
      (newData: Partial<Trade>) => {
        setData((prev) => {
          const original = [...prev] || [];

          original.pop();

          const add: Partial<Trade> = {
            isBuyerMaker: newData.isBuyerMaker,
            price: newData.price,
            timestamp: newData.timestamp,
            quantity: newData.quantity,
          };

          original.unshift(add);

          return original;
        });
      },
      `trade-${market}`
    );
  }, [market]);

  return (
    <div className="h-[500px] overflow-y-scroll scrollbar-hide">
      {data.map(({ price, quantity, timestamp, isBuyerMaker }, index) => (
        <Table
          price={parseFloat(price!)}
          quantity={parseFloat(quantity!)}
          time={timestamp!}
          val={isBuyerMaker!}
          key={index}
        />
      ))}
    </div>
  );
}

function Table({
  price,
  quantity,
  time,
  val,
}: {
  price: number;
  quantity: number;
  time: number;
  val: boolean;
}) {
  let data = getTimer(time);
  return (
    <div className="flex justify-between pl-2 pb-1 hover:bg-slate-800 hover:rounded-lg text-sm items-center">
      <div className={`${val ? "text-red-600" : "text-green-600"}`}>
        {price.toFixed(2)}
      </div>
      <div className="flex flex-row gap-4 items-center">
        <div className="pr-2">{quantity.toFixed(2)}</div>
        <div className="text-gray-500">{data}</div>
      </div>
    </div>
  );
}
