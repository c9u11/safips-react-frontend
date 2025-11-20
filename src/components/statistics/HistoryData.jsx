import IconLabel from "./IconLabel";
import { MdOutlineSpeed } from "react-icons/md";
import { LuTimer } from "react-icons/lu";
import { AiOutlineFire } from "react-icons/ai";
import { FaRoadCircleExclamation } from "react-icons/fa6";

export default function HistoryData({
  title,
  distance,
  count,
  speed,
  time,
  calories
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-[#e5e5e5]">{title}</span>
        <div className="bg-[#3b3b3b] text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
          <FaRoadCircleExclamation className="size-3 text-[#72D9FF]" />
          {count}회
        </div>
      </div>
      <span className="text-sm text-[#f6f6f6]">총 거리</span>
      <span className="text-4xl font-bold">
        {distance}
        <span className="text-sm">km</span>
      </span>
      <div className="flex gap-4">
        <IconLabel
          icon={<MdOutlineSpeed className="size-4 text-[#72D9FF]" />}
          label={speed}
          unit="km/h"
        />
        <IconLabel
          icon={<LuTimer className="size-4 text-[#72D9FF]" />}
          label={time}
        />
        <IconLabel
          icon={<AiOutlineFire className="size-4 text-[#72D9FF]" />}
          label={calories}
          unit="kcal"
        />
      </div>
    </>
  );
}
