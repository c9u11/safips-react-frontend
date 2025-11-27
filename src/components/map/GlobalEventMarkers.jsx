import { useEffect, useState, useRef } from "react";
import { useMap, Marker } from "react-leaflet";
import { reqGetGlobalEvent } from "@/apis/drive";
import WarningIcon from "./WarningIcon";


export default function GlobalEventMarkers() {
  const map = useMap();
  const [globalEvents, setGlobalEvents] = useState({});
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    map.on('moveend', () => {
      // 이전 요청이 진행 중이면 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 새로운 AbortController 생성
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const bounds = map.getBounds();
      const data = {
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLng: bounds.getWest(),
        maxLng: bounds.getEast(),
      };
      reqGetGlobalEvent(data, abortController.signal)
        .then((res) => {
          // 요청이 취소되지 않았을 때만 상태 업데이트
          if (!abortController.signal.aborted) {
            const newEvents = {};
            res.forEach((event) => { newEvents[`${event.latitude}-${event.longitude}`] = event });
            setGlobalEvents(prev => ({ ...prev, ...newEvents }));
          }
        })
        .catch((error) => {
          // AbortError는 무시 (의도적인 취소)
          if (error.name !== 'AbortError' && error.name !== 'CanceledError') {
            console.error('Error fetching global events:', error);
          }
        });
    });
    return () => {
      map.off('moveend');
      // 컴포넌트 언마운트 시 진행 중인 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [map]);
  return (
    <>
      {Object.values(globalEvents).map((event, idx) => (
        <Marker
          key={idx}
          position={[event.latitude, event.longitude]}
          icon={WarningIcon()}
        />
      ))}
    </>
  );
}