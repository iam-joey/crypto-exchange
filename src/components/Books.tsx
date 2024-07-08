"use client";
import React, { useEffect, useState } from "react";
import Red from "./RedTable";
import Green from "./GreemTable";
import { getDepth } from "@/utils/client";
import { WebSocketManager } from "@/utils/webSocket";
import { Depth, Trade } from "@/utils/types";

function Books({ market }: { market: string }) {
  const [red, setRed] = useState<[string, string][]>([]);
  const [green, setGreen] = useState<[string, string][]>([]);
  const [price, SetPrice] = useState<string>("");
  const [ren, setRen] = useState<boolean>();
  const getDepths = async () => {
    const data = await getDepth(market);
    setRed(data.asks.slice(0, 15));
    setGreen(data.bids.reverse().slice(0, 15));
  };

  useEffect(() => {
    getDepths();
    WebSocketManager.getInstance().registerCallBack(
      "trade",
      (data: Partial<Trade>) => {
        SetPrice(data.price!);
        setRen(data.isBuyerMaker);
      },
      `trade-${market}`
    );

    WebSocketManager.getInstance().registerCallBack(
      "depth",
      (data: Partial<Depth>) => {
        setRed((prev) => {
          const updated = [...prev] || [];

          for (let i = 0; i < updated.length; i++) {
            for (let j = 0; j < data.bids!.length; j++) {
              if (
                updated[i][0] === data.bids![j][0] &&
                data.bids![j][1] != "0.00"
              ) {
                updated[i][1] = data.bids![j][1];
                break;
              }
            }
          }

          return updated;
        });
        setGreen((prev) => {
          const updated = [...prev] || [];

          for (let i = 0; i < updated.length; i++) {
            for (let j = 0; j < data.asks!.length; j++) {
              if (
                updated[i][0] === data.asks![j][0] &&
                data.asks![j][1] != "0.00"
              ) {
                updated[i][1] = data.asks![j][1];
                break;
              }
            }
          }

          return updated;
        });
      },
      `DEPTH-${market}`
    );

    WebSocketManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.${market}`],
    });

    return () => {
      WebSocketManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${market}`
      );

      WebSocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.${market}`],
      });
    };
  }, [market]);
  return (
    <div
      className="flex flex-col justify-between p-2 text-xs max-h-[500px] overflow-y-scroll scrollbar-hide "
      ref={(div) => {
        if (div) {
          const scrollHeight = div.scrollHeight;
          const clientHeight = div.clientHeight;
          div.scrollTop = (scrollHeight - clientHeight) / 2;
        }
      }}
    >
      <Red market={market} array={red} />
      <Middle price={price} ren={ren!} />
      <Green market={market} array={green} />
    </div>
  );
}

export default Books;

function Middle({ price, ren }: { price: string; ren: boolean }) {
  if (!price) {
    return <div className=" border-white text-xs">Loading</div>;
  }
  return (
    <div className={`${ren ? "text-red-600" : "text-green-500"} text-lg `}>
      {price}
    </div>
  );
}
