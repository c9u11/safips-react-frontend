import GlobalNavigationBar from "@/components/layout/GlobalNavigationBar";
import CustomMap from "@/components/map/CustomMap";

export default function Map() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-1 relative">
        <CustomMap currentPositionEnabled={true} showGlobalEvents={true} />
      </div>
      <GlobalNavigationBar />
    </div>
  );
}
