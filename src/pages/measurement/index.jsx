import { LuBike } from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineFire } from "react-icons/ai";
import { IoLockOpen } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoStop } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

export default function Measurement(){
    return (

        <div className="bg-[#1c1c1c] text-white min-h-screen flex flex-col">
            <header className="py-10 px-7 text-xl font-semibold flex items-center justify-between">
                <h1>사이클 측정</h1>
                <IoMenu className="size-7"/>
            </header>
           <div className="w-full flex flex-col items-center ">
                <div className="mt-5 rounded-r-full rounded-l-full bg-[#272727] w-48 h-15 flex items-center justify-center">
                    <p className="text-[#d4d4d8] text-[18px] font-medium">2025.10.21 (화)</p>
                </div>
            </div>
            <div className="mt-20 pb-5 w-full flex flex-col items-center gap-y-2">
                <LuBike className="size-9 stroke-[#72D9FF]"/>
                <p className="text-8xl font-bold">0.00</p>
                <p className="text-[#d4d4d8] text-[18px]">거리(km)</p>
            </div>
            <div className="w-full flex items-center mt-10">
                <div className="flex-1 flex flex-col items-center">
                    <MdOutlineSpeed className="size-6 fill-[#d4d4d8]" />
                    <p className="text-2xl font-bold mt-2.5">0'00''</p>
                    <p className="text-[15px] text-[#d4d4d8] text-base">평균속도</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <RiTimerLine className="size-6 fill-[#d4d4d8]"/>
                    <p className="text-2xl font-bold mt-2.5">00:00</p>
                    <p className="text-[15px] text-[#d4d4d8] text-base">시간</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <AiOutlineFire className="size-6 fill-[#d4d4d8]"/>
                    <p className="text-2xl font-bold mt-2.5">100</p>
                    <p className="text-[15px] text-[#d4d4d8] text-base">칼로리</p>
                </div>
            </div>
            <div className="w-full flex items-center mt-20 justify-center">
                <button className="rounded-full bg-[#424242] w-20 h-20 mr-7 flex items-center justify-center">
                    <IoLockOpen className="size-7 fill-[#d4d4d8]"/>
                    {/*<IoLockClosed className="size-7 fill-[#898989]"/>*/}
                </button>

                <button className="rounded-full bg-[#72D9FF] mr-7 w-25 h-25 flex items-center justify-center">
                    <IoPlay className="size-12 ml-1 fill-[#1c1c1c]" />
                </button>
                <button className="rounded-full bg-[#424242] w-20 h-20 flex items-center justify-center">
                    <IoStop className="size-7 fill-[#d4d4d8]" />
                </button>
            </div>



        </div>
        
    )
}