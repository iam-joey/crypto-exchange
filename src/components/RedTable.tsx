"use client";
import { useEffect, useState } from "react";

function Red({ market, array }: { market: string; array: [string, string][] }) {
  const getFinalArray = (red: [string, string][]) => {
    let final: [string, string, string][] = [];
    let current = 0;
    for (let i = 0; i < red.length; i++) {
      current = current + parseFloat(red[i][1]);
      final.push([red[i][0], red[i][1], current.toFixed(2).toString()]);
    }

    setMax(current);
    setFinalArray(final.reverse());
  };

  const [finalArray, setFinalArray] = useState<[string, string, string][]>([]);
  const [max, setMax] = useState<number>(0);
  useEffect(() => {
    getFinalArray(array);
  }, [array]);

  return (
    <div className=" flex flex-col ">
      {finalArray.map(([price, quantity, total]) => (
        <Table
          price={price}
          quantity={quantity}
          total={total}
          key={total}
          maxTotal={max}
        />
      ))}
    </div>
  );
}

export default Red;

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
    <div className="p-1 relative  ">
      <div
        className="h-full absolute right-0 bg-red-600 -z-10"
        style={{
          width: `${(Number(quantity) / maxTotal) * 100}%`,
          maxWidth: "80px",
          transition: "width 0.1s ease-in-out",
        }}
      ></div>
      <div
        className=" h-full absolute right-0 bg-red-950 -z-20"
        style={{
          width: `${(Number(total) / maxTotal) * 100}%`,
          maxWidth: "120px",
          transition: "width 0.1s ease-in-out",
        }}
      ></div>
      <div className="flex justify-between z-10">
        <div className="text-red-700">{price}</div>
        <div>{quantity}</div>
        <div>{total}</div>
      </div>
    </div>
  );
}
