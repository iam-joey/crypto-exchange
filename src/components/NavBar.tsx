"use client";
import Image from "next/image";
import React from "react";

import { useRouter, usePathname } from "next/navigation";

function NavBar() {
  const router = useRouter();
  const route = usePathname();
  return (
    <div className="text border-b border-slate-800 p-2">
      <div className=" flex flex-row justify-between">
        <div
          className="flex gap-3 items-center
            "
        >
          <div className="p-1 text-xl cursor-pointer">
            <Image
              loading="lazy"
              src={"/backpack.png"}
              width={150}
              height={150}
              alt="Image"
            />
          </div>
          <div
            onClick={() => router.push("/market")}
            className={`text-xl p-1 cursor-pointer  ${
              route.startsWith("/market") ? "text-white" : "text-gray-600"
            } hover:text-white`}
          >
            Markets
          </div>
          <div
            onClick={() => router.push("/trade/SOL_USDC")}
            className={`text-xl p-1 cursor-pointer   ${
              route.startsWith("/trade") ? "text-white" : "text-gray-600"
            } hover:text-white`}
          >
            Trade
          </div>
        </div>
        <div className="flex gap-3 items-center justify-around">
          <div className="p-3  cursor-pointer">
            <button className="p-1 pl-2 pr-2  text-green-400 bg-green-900 rounded-lg text-center">
              {" "}
              Sign up
            </button>
          </div>
          <div className="p-3 cursor-pointer ">
            <button className="p-1 pl-2 pr-2 text-center  text-blue-400 bg-blue-900 rounded-lg">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
