import Drawer from "./Drawer";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Item from "./Item";
import ShakeGraph from "./ShakeGraph";
import CustomMap from "../map/CustomMap";
import useHistoryStore from "@/stores/useHistoryStore";
import { useEffect, useState } from "react";
import { getSecondsBetweenDates } from "@/utils/date";
import { getDriveDetailData } from "@/utils/drive";
export default function HistoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const getHistoryDataById = useHistoryStore((state) => state.getHistoryDataById);
  const historyData = useHistoryStore((state) => state.historyData);
  const { startDateTime, distance, eventCount, endDateTime, totalCalories, route } = historyData[id];
  const [points, setPoints] = useState([]);
  const [positions, setPositions] = useState([]);
  const [impactValues, setImpactValues] = useState([]);

  useEffect(() => {
    if (route) {
      const { positions, impactValues, impactPoints } = getDriveDetailData(route);
      setPoints(impactPoints);
      setPositions(positions);
      setImpactValues(impactValues);
    }
  }, [route]);

  useEffect(() => {
    getHistoryDataById(id);
  }, [id]);

  return (
    <div className="w-full flex-1 flex flex-col bg-[#ddd]">
      <div className="w-full flex-1 relative">
        <CustomMap points={points} positions={positions} currentPositionEnabled={false} />
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
            <Item title="총 시간" value={getSecondsBetweenDates(startDateTime, endDateTime)} />
            <Item title="총 거리" value={`${distance} km`} />
            <Item title="총 칼로리" value={`${totalCalories} kcal`} />
          </div>
        }
        drawerContent={
          <div className="w-full gap-4 flex items-center">
            <Item title="흔들림" value={eventCount} />
            <div className="flex-1 aspect-2/1 overflow-hidden">
              <ShakeGraph data={impactValues} />
            </div>
          </div>
        }
      />
    </div>
  );
}
