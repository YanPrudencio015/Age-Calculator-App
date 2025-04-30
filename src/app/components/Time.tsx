

export default function Time() {

  return (
    <div className=" w-full h-[60%] sm:h-[40%] rounded-[8vw] sm:rounded-[1vw] rounded-t-none sm:rounded-t-none rounded-br-[30vw] sm:rounded-br-[10vw] flex justify-center flex-col gap-1 items-center">
      <div className="w-[80%] h-15 sm:h-17 flex justify-start flex-row items-center gap-3">
        <p className="text-[#854dff] text-[3em] sm:text-[4.5em] font-black font-poppins italic">38</p>
        <p className=" text-[#000] lowercase text-[13vw] sm:text-[4vw] font-poppins font-black italic">years</p>
      </div>
      <div className="w-[80%] h-15 sm:h-17 flex justify-start flex-row items-center gap-3">
        <p className="text-[#854dff] text-[3em] sm:text-[4.5em] font-black font-poppins italic">3</p>
        <p className=" text-[#000] lowercase text-[13vw] sm:text-[4vw] font-poppins font-black italic">months</p>
      </div>
      <div className="w-[80%] h-15 sm:h-17 flex justify-start flex-row items-center gap-3">
        <p className="text-[#854dff] text-[3em] sm:text-[4.5em] font-black font-poppins italic">26</p>
        <p className=" text-[#000]  lowercase text-[13vw] sm:text-[4vw] font-poppins font-black italic">Days</p>
      </div>
    </div>
  );
}
