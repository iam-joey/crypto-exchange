import React from "react";

function LandingPage() {
  return (
    <div className=" h-full max-w-[1250px] mx-auto bg-slate-950 rounded-lg">
      <Heading />
    </div>
  );
}

export default LandingPage;

function Heading() {
  return (
    <div className="p-3 flex justify-between border border-slate-700 text-slate-500 font-semibold">
      <div className=" w-[25%]">Name</div>
      <div className="flex flex-1 justify-between">
        <div>Price</div>
        <div>Market Cap</div>
        <div>24h Volume</div>
        <div>24h Change</div>
      </div>
    </div>
  );
}
