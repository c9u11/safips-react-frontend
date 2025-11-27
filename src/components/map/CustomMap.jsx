import { MapContainer, TileLayer, Polyline, Marker, ScaleControl } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import WarningIcon from "./WarningIcon";
import GlobalEventMarkers from "./GlobalEventMarkers";
import AutoMapBounds from "./AutoMapBounds";
import CurrentMarker from "./CurrentMarker";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function CustomMap({ positions, points, currentPositionEnabled = true, showGlobalEvents = false, children, ...props }) {
  // 한국 범위 (최대 경계)
  const koreaBounds = [
    [33.0, 124.5], // 남서쪽
    [38.6, 132.0], // 북동쪽
  ];

  return (
    <MapContainer
      center={[37.5145, 126.9076]}
      zoom={13}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      zoomControl={false}
      scrollWheelZoom={true}
      maxBounds={koreaBounds}
      maxBoundsViscosity={1.0}
      minZoom={7}
      maxZoom={18}
    >
      <TileLayer
        attribution='<br/>&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a><br/>&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a><br/>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> <br/>contributors'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${import.meta.env.VITE_STADIAMAPS_API_KEY}`}
        maxZoom={19}
      />

      <ScaleControl
        position="bottomleft"
        imperial={false}
        metric={true}
      />

      {positions && positions.length > 0 && (
        <>
          <AutoMapBounds positions={positions} />
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#72D9FF",
              weight: 4,
              opacity: 0.8,
            }}
            smoothFactor={1.0}
          />
        </>
      )}

      {points && points.length > 0 && points.map((point, index) => (
        <Marker
          key={index}
          position={[point.latitude, point.longitude]}
          icon={WarningIcon()}
        />
      ))}

      {currentPositionEnabled && <CurrentMarker />}
      {showGlobalEvents && (<GlobalEventMarkers />)}
      {children}
    </MapContainer>
  );
}
