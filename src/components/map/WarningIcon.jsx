import L from "leaflet";
import { renderToString } from "react-dom/server";
import { GoShield } from "react-icons/go";

export default function WarningIcon() {
  return L.divIcon({
    className: "shock-warning-icon",
    html: renderToString(
      <div className="flex justify-center items-center p-1 aspect-square rounded-full bg-[#FF3D3D]/20 overflow-hidden">
        <div className="flex justify-center items-center p-1 aspect-square rounded-full bg-[#FF3D3D]/30 overflow-hidden">
          <GoShield className="size-5 text-[#FF3D3D] stroke-[1px]" />
        </div>
      </div>
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};