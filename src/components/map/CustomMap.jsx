import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import WarningIcon from "./WarningIcon";
import CurrentLocationIcon from "./CurrentLocationIcon";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function MapBounds({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions && positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, positions]);

  return null;
}

// 현재 위치를 지도에 따라가는 컴포넌트
function FollowCurrentLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude], map.getZoom(), {
        animate: true,
        duration: 0.5,
      });
    }
  }, [map, position]);

  return null;
}

export default function CustomMap({ positions, points, currentPositionEnabled = true }) {
  // 한국 범위 (최대 경계)
  const koreaBounds = [
    [33.0, 124.5], // 남서쪽
    [38.6, 132.0], // 북동쪽
  ];

  // 현재 위치 상태
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!currentPositionEnabled) return;
    // 위치 추적 시작
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    // 위치 업데이트 옵션
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    // 실시간 위치 추적
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLocationError(null);
      },
      (error) => {
        setLocationError(error.message);
        console.error("Geolocation error:", error);
      },
      options
    );

    // 클린업
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <MapContainer
      center={[37.5145, 126.9076]}
      zoom={13}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      zoomControl={true}
      scrollWheelZoom={true}
      maxBounds={koreaBounds}
      maxBoundsViscosity={1.0}
      minZoom={7}
      maxZoom={18}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />
      {
        positions && positions.length > 0 && (
          <>
            <MapBounds positions={positions} />
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
        )
      }

      {points && points.length > 0 && points.map((point, index) => (
        <Marker
          key={index}
          position={[point.latitude, point.longitude]}
          icon={WarningIcon()}
        >
          <Popup>
            <div>
              <strong>충격 주의</strong>
              <br />
              가속도: {point.magnitude.toFixed(2)} m/s²
            </div>
          </Popup>
        </Marker>
      ))}

      {currentPositionEnabled && currentPosition && (
        <>
          <FollowCurrentLocation position={currentPosition} />
          <Marker
            position={[currentPosition.latitude, currentPosition.longitude]}
            icon={CurrentLocationIcon()}
          >
            <Popup>
              <div>
                <strong>현재 위치</strong>
                <br />
                위도: {currentPosition.latitude.toFixed(6)}
                <br />
                경도: {currentPosition.longitude.toFixed(6)}
                {currentPosition.accuracy && (
                  <>
                    <br />
                    정확도: ±{Math.round(currentPosition.accuracy)}m
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
}
