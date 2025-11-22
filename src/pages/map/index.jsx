import GlobalNavigationBar from "@/components/layout/GlobalNavigationBar";
import CustomMap from "@/components/map/CustomMap";

export default function Map() {
  const points = [
    { latitude: 37.5133, longitude: 126.8952, magnitude: 18.5 },
    { latitude: 37.5235, longitude: 126.9076, magnitude: 16.2 },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-1 relative">
        <CustomMap points={points} currentPositionEnabled={true} />
      </div>
      <GlobalNavigationBar />
    </div>
  );
}
