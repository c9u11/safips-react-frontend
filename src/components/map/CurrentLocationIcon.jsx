import L from "leaflet";
import { renderToString } from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function CurrentLocationIcon() {
  return L.divIcon({
    className: "current-location-icon",
    html: renderToString(
      <div style={{
        position: 'relative',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto'
      }}>
        {/* 펄스 애니메이션을 위한 외부 링 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(114, 217, 255, 0.3)',
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            transformOrigin: 'center center',
          }}
        ></div>
        <div className="flex justify-center items-center p-2 aspect-square rounded-full bg-[#72D9FF]/30 overflow-hidden">
          <FaMapMarkerAlt className="size-5 text-[#72D9FF] stroke-[1px]" />
        </div>
        <style>{`
          @keyframes ping {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            75%, 100% {
              transform: translate(-50%, -50%) scale(2);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

