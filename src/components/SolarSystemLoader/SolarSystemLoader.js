"use client";

export default function SolarSystemLoader() {
  return (
    <div className="flex justify-center">
      <div className="w-[250px] h-[250px] flex justify-center items-center">
        <div className="relative flex justify-center items-center border border-[#fafbfc] rounded-full w-[165px] h-[165px] animate-spin-12">
          <div className="absolute top-[-5px] w-2.5 h-2.5 rounded-full bg-[#3ff9dc]"></div>
          <div className="relative flex justify-center items-center border border-[#fafbfc] rounded-full w-[120px] h-[120px] animate-spin-7">
            <div className="absolute top-[-5px] w-2.5 h-2.5 rounded-full bg-[#3ff9dc]"></div>
            <div className="relative flex justify-center items-center border border-[#fafbfc] rounded-full w-[90px] h-[90px] animate-spin-3">
              <div className="absolute top-[-5px] w-2.5 h-2.5 rounded-full bg-[#3ff9dc]"></div>
              <div className="w-[35px] h-[35px] rounded-full bg-[#ffab91]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
