"use client";
import { getTicker } from "@/utils/client";
import { Ticker, Trade } from "@/utils/types";
import { WebSocketManager } from "@/utils/webSocket";
import React, { useEffect, useState } from "react";

function MarketBar({ market }: { market: string }) {
  const [ticker, setTicker] = useState<Ticker | null>(null);
  const [price, setprice] = useState<any>();
  const [imp, setImp] = useState<boolean>();
  const call = async () => {
    const data = await getTicker(market);
    setTicker(data);
  };

  useEffect(() => {
    call();
    WebSocketManager.getInstance().registerCallBack(
      "trade",
      (data: Partial<Trade>) => {
        setprice(data.price);
        setImp(data.isBuyerMaker);
      },
      `trade-${market}`
    );

    WebSocketManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`trade.${market}`],
    });

    WebSocketManager.getInstance().registerCallBack(
      "ticker",
      (data: Partial<Ticker>) => {
        setTicker((prevTicker) => ({
          firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
          high: data?.high ?? prevTicker?.high ?? "",
          lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
          low: data?.low ?? prevTicker?.low ?? "",
          priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
          priceChangePercent:
            data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
          quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
          symbol: data?.symbol ?? prevTicker?.symbol ?? "",
          trades: data?.trades ?? prevTicker?.trades ?? "",
          volume: data?.volume ?? prevTicker?.volume ?? "",
        }));
      },
      `ticker-${market}`
    );
    WebSocketManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    return () => {
      WebSocketManager.getInstance().deRegisterCallback(
        "ticker",
        `ticker-${market}`
      );
      WebSocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
      WebSocketManager.getInstance().deRegisterCallback(
        "trade",
        `trade-${market}`
      );
      WebSocketManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${market}`],
      });
    };
  }, [market]);
  return (
    <div
      className="h-[66px] p-2 flex flex-row items-center gap-3
  "
    >
      <div className="text-lg cursor-pointer hover:text-gray-300 font-semibold mx-5">
        {market}
      </div>
      <div className="flex flex-col gap-0 ml-3 items-center font-semibold">
        <p className={`${!imp ? "text-green-600" : "text-red-500"} text-sm`}>
          {price ?? ticker?.lastPrice}
        </p>
        <p className="text-xs">${ticker?.lastPrice}</p>
      </div>
      <div className="flex flex-col items-center ml-3 gap-0">
        <p className="text-xs text-gray-400">24H Change</p>
        <PriceChange
          price={ticker?.priceChange!}
          percentage={ticker?.priceChangePercent!}
        />
      </div>
      <div className="flex flex-col items-center ml-3 gap-0">
        <p className="text-xs text-gray-400">24H High</p>
        <p className="">{ticker?.high}</p>
      </div>
      <div className="flex flex-col items-center ml-3 gap-0">
        <p className="text-xs text-gray-400">24H Low</p>
        <p className="">{ticker?.low}</p>
      </div>
      <div className="flex flex-col items-center ml-3 gap-0 cursor-pointer ">
        <p className="text-xs text-gray-400 ">24H Volume (USDC)</p>
        <p className="">{parseFloat(ticker?.quoteVolume!).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default MarketBar;

function PriceChange({
  price,
  percentage,
}: {
  price: string;
  percentage: string;
}) {
  if (!price) {
    return <p>---</p>;
  }
  const changeValue = parseFloat(price);
  const className = changeValue < 0 ? "text-red-500" : "text-green-500";
  const updatedPercentage = parseFloat(percentage);
  const sign = changeValue < 0 ? "" : "+";
  return (
    <p className={`${className}`}>
      {sign}
      {price} {sign}
      {(updatedPercentage * 100).toFixed(2)}%
    </p>
  );
}
