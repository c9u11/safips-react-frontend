import {
  ROUTES_PATH_HOME,
  ROUTES_PATH_STATISTICS,
  ROUTES_PATH_MAP,
  ROUTES_PATH_MY
} from "@/constants/routes";
import { LuBike } from "react-icons/lu";
import { FaChartSimple, FaUser } from "react-icons/fa6";
import { HiMap } from "react-icons/hi2";

import NavigationIcon from "./NavigationIcon";

export default function GlobalNavigationBar() {
  return (
    <div className="w-full h-16 flex justify-around items-center border-t border-[#27272a]">
      <NavigationIcon Icon={LuBike} to={ROUTES_PATH_HOME} />
      <NavigationIcon Icon={FaChartSimple} to={ROUTES_PATH_STATISTICS} />
      <NavigationIcon Icon={HiMap} to={ROUTES_PATH_MAP} />
      <NavigationIcon Icon={FaUser} to={ROUTES_PATH_MY} />
    </div>
  );
}
