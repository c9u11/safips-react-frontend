import Drawer from "./Drawer";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import ShakeGraph from "./ShakeGraph";
import CustomMap from "../map/CustomMap";
import { POSITIONS_EXAMPLE } from "@/examples/map";
import useOverviewStore from "@/stores/useOverviewStore";
import { useEffect } from "react";

export default function Overview() {
  const navigate = useNavigate();

  const getOverviewData = useOverviewStore((state) => state.getOverviewData);
  const totalDistance = useOverviewStore((state) => state.totalDistance);
  const averageSpeed = useOverviewStore((state) => state.averageSpeed);
  const totalCalories = useOverviewStore((state) => state.totalCalories);
  const totalEventCount = useOverviewStore((state) => state.totalEventCount);

  useEffect(() => {
    getOverviewData();
  }, []);
  return (
    <div className="w-full flex-1 flex flex-col bg-[#ddd]">
      <div className="w-full flex-1 relative">
        <CustomMap positions={POSITIONS_EXAMPLE} currentPositionEnabled={false} />
      </div>
      <button
        className="absolute top-8 left-8 bg-[#272727] rounded-lg p-2 shadow-md"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack className="size-6 fill-[#f6f6f6]" />
      </button>
      <Drawer
        visibleContent={
          <div className="flex justify-between">
            <Item title="총 시간" value="1:10:527" />
            <Item title="총 거리" value={totalDistance.toFixed(2) + " km"} />
            <Item title="총 칼로리" value={totalCalories.toFixed(1) + " kcal"} />
          </div>
        }
        drawerContent={
          <div className="w-full gap-4 flex items-center">
            <Item title="흔들림" value={totalEventCount + "회"} />
            <div className="flex-1 aspect-2/1 overflow-hidden">
              <ShakeGraph />
            </div>
          </div>
        }
      />
    </div>
  );
}
