"use client";

import { useEffect, useState } from "react";

function Green({
  market,
  array,
}: {
  market: string;
  array: [string, string][];
}) {
  const getFinalArray = (green: [string, string][]) => {
    let final: [string, string, string][] = [];

    let counter = 0;
    for (let i = 0; i < green.length; i++) {
      counter += parseFloat(green[i][1]);
      final.push([green[i][0], green[i][1], counter.toFixed(2)]);
    }
    setGreen(final);
    setMax(counter);
  };

  const getDepths = async () => {};

  const [green, setGreen] = useState<[string, string, string][]>([]);
  const [max, setMax] = useState<number>(0);

  useEffect(() => {
    getFinalArray(array);
  }, [array]);

  return (
    <div className="flex flex-col">
      {green.map(([price, quantity, total]) => (
        <Table
          price={price}
          maxTotal={max}
          quantity={quantity}
          total={total}
          key={total}
        />
      ))}
    </div>
  );
}

export default Green;

function Table({
  price,
  quantity,
  total,
  maxTotal,
}: {
  price: string;
  quantity: string;
  total: string;
  maxTotal: number;
}) {
  return (
    <div className="p-1 relative bg-transparent">
      <div
        className=" h-full absolute right-0 bg-green-600 -z-10"
        style={{
          width: `${(Number(quantity) / maxTotal) * 50}%`,
          maxWidth: "80px",
          transition: "width 0.1s ease-in-out",
        }}
      ></div>
      <div
        className=" h-full absolute right-0 bg-green-950 -z-20"
        style={{
          width: `${(Number(total) / maxTotal) * 100}%`,
          maxWidth: "120px",
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
      <div className="flex justify-between z-10">
        <div className="text-green-700">{price}</div>
        <div>{quantity}</div>
        <div>{total}</div>
      </div>
    </div>
  );
}
