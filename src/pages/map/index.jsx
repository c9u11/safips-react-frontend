import GlobalNavigationBar from "@/components/layout/GlobalNavigationBar";
import CustomMap from "@/components/map/CustomMap";
import { POINTS_EXAMPLE } from "@/examples/map";

export default function Map() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-1 relative">
        <CustomMap points={POINTS_EXAMPLE} currentPositionEnabled={true} />
      </div>
      <GlobalNavigationBar />
    </div>
  );
}
