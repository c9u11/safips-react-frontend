import { useEffect } from "react";
import { useMap, Marker } from "react-leaflet";
import { useState } from "react";
import CurrentLocationIcon from "./CurrentLocationIcon";

export default function CurrentMarker() {
  const map = useMap();

  // 현재 위치 상태
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [once, setOnce] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    if (currentPosition && !once) {
      map.setView([currentPosition.latitude, currentPosition.longitude], map.getZoom(), {
        animate: true,
        duration: 0.5,
      });
      setOnce(true);
    }
  }, [map, currentPosition, once]);

  return (
    <>
      {
        currentPosition?.latitude && currentPosition?.longitude ? (
          <Marker
            position={[currentPosition.latitude, currentPosition.longitude]}
            icon={CurrentLocationIcon()}
            zIndexOffset={1000}
          />
        ) : null
      }
    </>
  );
}