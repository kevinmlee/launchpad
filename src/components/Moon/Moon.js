"use client";

export default function Moon() {
  return (
    <div className="absolute right-40 top-1/2 -translate-y-1/2 sm:relative sm:right-auto sm:top-auto sm:translate-y-0">
      <div className="relative top-1/4 mx-auto h-[100px] w-[100px] bg-[#eaeaea] rounded-full animate-floating z-10" style={{boxShadow: 'inset -15px 0 6px #bfbfbf, 0 0 8px #eaeaea'}}>
        <div className="moon-crater absolute top-[20%] left-[20%] h-[20%] w-[20%] bg-[#bfbfbf] rounded-full opacity-40" style={{boxShadow: 'inset -1px 0 1px #9e9e9e'}}></div>
        <div className="moon-eye absolute bottom-[30%] left-[10%] h-[15%] w-[9%] bg-[#333] rounded-full animate-blink"></div>
        <div className="moon-eye absolute bottom-[25%] left-[30%] h-[15%] w-[9%] bg-[#333] rounded-full animate-blink"></div>
      </div>
      <div className="absolute top-[20%] left-[calc((100%-300px)/2)] h-[200px] w-[300px]">
        <div className="star-point absolute top-0 left-[10%] h-[3px] w-[3px]">
          <span className="absolute top-[10px] left-[150px] h-1 w-1 bg-[#efe894] rounded-full animate-glow block" style={{boxShadow: '0 0 5px #efe894'}}></span>
          <span className="absolute top-[2px] left-[90px] h-[3px] w-[3px] bg-[#efe894] rounded-full animate-glow block" style={{boxShadow: '0 0 5px #efe894'}}></span>
        </div>
        <div className="star-point absolute top-[20%] left-[15%] h-1 w-1">
          <span className="absolute top-[53px] left-[-12px] h-[3px] w-[3px] bg-[#efe894] rounded-full animate-glow block" style={{boxShadow: '0 0 5px #efe894'}}></span>
          <span className="absolute top-[-10px] left-[40px] h-[3px] w-[3px] bg-[#efe894] rounded-full animate-glow block" style={{boxShadow: '0 0 5px #efe894'}}></span>
        </div>
        <div className="star-point absolute bottom-[20%] right-[28%] h-[3px] w-[3px]">
          <span className="absolute bottom-[35px] right-[-10px] h-1 w-1 bg-[#efe894] rounded-full animate-glow block" style={{boxShadow: '0 0 5px #efe894'}}></span>
          <span className="absolute top-[10px] right-[80px] h-[3px] w-[3px] bg-[#efe894] rounded-full animate-glow block" style={{boxShadow: '0 0 5px #efe894'}}></span>
        </div>
        <div className="star-point absolute bottom-[25%] right-[10%] h-[5px] w-[5px]"></div>
      </div>
    </div>
  );
}
