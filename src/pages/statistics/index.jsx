import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { LuShieldAlert } from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineFire } from "react-icons/ai";
import { RiPoliceBadgeFill } from "react-icons/ri";

export default function statistics(){

    return(
        <div className="bg-[#1c1c1c] text-white w-full h-screen flex flex-col">
            <header className="py-10 px-7 text-xl font-semibold flex items-center justify-center flex-shrink-0">
                <HiOutlineArrowSmLeft className="absolute left-7 size-7"/>
                <p className="text-center">통계</p>
            </header>
            <div className="flex-1 overflow-y-auto px-7">
            <div className="w-full flex items-center justify-between mt-5">
                <p className="text-2xl font-semibold">Overview</p>
                <p className="text-[#767676] text-base font-medium">{"자세히보기 >"}</p>
            </div>
            <div className="w-full flex flex-col items-center px-7 ">
                <div className="pt-7 bg-[#272727] w-[343px] h-[380px] rounded-2xl mt-5">
                    <div className=" px-7 flex items-center justify-between">
                        <p className="text-[18px] font-medium">총 거리</p>
                        <div className="bg-[#3b3b3b] rounded-r-full rounded-l-full w-20 h-9 flex items-center justify-center">
                            <LuShieldAlert className="stroke-[#72D9FF] size-5 mr-1"/>
                            <p className="font-bold text-[16px] mr-1">0회</p>
                        </div>
                    </div>
                    <p className="px-7 text-5xl font-bold mt-3">
                        40.00
                        <span className="text-xl font-semibold">km</span>
                    </p>
                    <div className="w-full px-7 flex items-center mt-4 gap-2">
                        <div className="flex items-center justify-center gap-1">
                            <MdOutlineSpeed className="size-5 fill-[#72D9FF]" />
                            <p className="text-[17px] font-semibold">0'00''<span className="text-[12px] font-light">(km/h)</span></p>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            <RiTimerLine className="size-5 fill-[#72D9FF]"/>
                            <p className="text-[17px] font-semibold">1:00:00</p>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            <AiOutlineFire className="size-5 fill-[#72D9FF]"/>
                            <p className="text-[17px] font-semibold">100<span className="text-[12px] font-light">kcal</span></p>
                        </div>
                    </div>
                    <hr className="text-[#444444] mt-7 mx-7"></hr>
                    <p className="text-[18px] font-medium mt-7 px-7 ">획득 뱃지</p>
                    <div className="w-full overflow-x-auto py-4 px-7">
                        <div className="flex gap-3 min-w-max" >
                            <div className="bg-[#3b3b3b] w-[80px] h-[80px] rounded-xl flex items-center justify-center">
                                <RiPoliceBadgeFill className="size-9 fill-[#555555]"/>
                            </div>
                            <div className="bg-[#3b3b3b] w-[80px] h-[80px] rounded-xl flex items-center justify-center">
                            <RiPoliceBadgeFill className="size-9 fill-[#555555]"/>
                            </div>
                            <div className="bg-[#3b3b3b] w-[80px] h-[80px] rounded-xl flex items-center justify-center">
                            <RiPoliceBadgeFill className="size-9 fill-[#555555]"/>
                            </div>
                            <div className="bg-[#3b3b3b] w-[80px] h-[80px] rounded-xl flex items-center justify-center">
                            <RiPoliceBadgeFill className="size-9 fill-[#555555]"/>
                            </div>
                            <div className="bg-[#3b3b3b] w-[80px] h-[80px] rounded-xl flex items-center justify-center">
                            <RiPoliceBadgeFill className="size-9 fill-[#555555]"/>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className=" bg-[#272727] w-[343px] h-[200px] rounded-2xl mt-5">
                        <p className="py-7 px-7 text-[18px] font-medium">라이딩 경로</p>
                    </div>
                </div>
                <p className="text-xl font-bold text-left mt-10">최근 기록</p>
                <div className="w-full mt-5 flex flex-col items-center"> 
                    <div className="bg-[#272727] w-[343px] h-[210px] rounded-2xl">
                        <div className=" pt-7 px-7 flex items-center justify-between">
                            <p className="text-[17px] font-medium text-[#e5e5e5]">2025.10.22(수)</p>
                            <div className="bg-[#3b3b3b] rounded-r-full rounded-l-full w-18 h-8 flex items-center justify-center">
                                <LuShieldAlert className="stroke-[#72D9FF] size-4 mr-1"/>
                                <p className="font-bold text-[15px] mr-1">0회</p>
                            </div>
                        </div>
                        <p className="px-7 text-[18px] font-medium mt-5">총 거리</p>
                        <p className="px-7 text-4xl font-bold">10.00<span className="text-xl font-semibold">km</span></p>
                        <div className="w-full px-7 flex items-center mt-4 gap-2">
                            <div className="flex items-center justify-center gap-1">
                                <MdOutlineSpeed className="size-4 fill-[#72D9FF]" />
                                <p className="text-[15px] font-semibold">0'00''<span className="text-sm font-light">(km/h)</span></p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <RiTimerLine className="size-4 fill-[#72D9FF]"/>
                                <p className="text-[15px] font-semibold">1:00:00</p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <AiOutlineFire className="size-4 fill-[#72D9FF]"/>
                                <p className="text-[15px] font-semibold">100<span className="text-[12px] font-light">kcal</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#272727] w-[343px] h-[210px] rounded-2xl mt-4">
                        <div className=" pt-7 px-7 flex items-center justify-between">
                            <p className="text-[17px] font-medium text-[#e5e5e5]">2025.10.22(수)</p>
                            <div className="bg-[#3b3b3b] rounded-r-full rounded-l-full w-18 h-8 flex items-center justify-center">
                                <LuShieldAlert className="stroke-[#72D9FF] size-4 mr-1"/>
                                <p className="font-bold text-[15px] mr-1">0회</p>
                            </div>
                        </div>
                        <p className="px-7 text-[18px] font-medium mt-5">총 거리</p>
                        <p className="px-7 text-4xl font-bold">10.00<span className="text-xl font-semibold">km</span></p>
                        <div className="w-full px-7 flex items-center mt-4 gap-2">
                            <div className="flex items-center justify-center gap-1">
                                <MdOutlineSpeed className="size-4 fill-[#72D9FF]" />
                                <p className="text-[15px] font-semibold">0'00''<span className="text-sm font-light">(km/h)</span></p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <RiTimerLine className="size-4 fill-[#72D9FF]"/>
                                <p className="text-[15px] font-semibold">1:00:00</p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <AiOutlineFire className="size-4 fill-[#72D9FF]"/>
                                <p className="text-[15px] font-semibold">100<span className="text-[12px] font-light">kcal</span></p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-[#272727] w-[343px] h-[210px] rounded-2xl mt-4">
                        <div className=" pt-7 px-7 flex items-center justify-between">
                            <p className="text-[17px] font-medium text-[#e5e5e5]">2025.10.22(수)</p>
                            <div className="bg-[#3b3b3b] rounded-r-full rounded-l-full w-18 h-8 flex items-center justify-center">
                                <LuShieldAlert className="stroke-[#72D9FF] size-4 mr-1"/>
                                <p className="font-bold text-[15px] mr-1">0회</p>
                            </div>
                        </div>
                        <p className="px-7 text-[18px] font-medium mt-5">총 거리</p>
                        <p className="px-7 text-4xl font-bold">10.00<span className="text-xl font-semibold">km</span></p>
                        <div className="w-full px-7 flex items-center mt-4 gap-2">
                            <div className="flex items-center justify-center gap-1">
                                <MdOutlineSpeed className="size-4 fill-[#72D9FF]" />
                                <p className="text-[15px] font-semibold">0'00''<span className="text-sm font-light">(km/h)</span></p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <RiTimerLine className="size-4 fill-[#72D9FF]"/>
                                <p className="text-[15px] font-semibold">1:00:00</p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <AiOutlineFire className="size-4 fill-[#72D9FF]"/>
                                <p className="text-[15px] font-semibold">100<span className="text-[12px] font-light">kcal</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            







        </div>
    )
}