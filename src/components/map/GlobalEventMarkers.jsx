import { useEffect, useState, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { reqGetGlobalEvent } from "@/apis/drive";


export default function GlobalEventMarkers() {
  const map = useMap();
  const [globalEvents, setGlobalEvents] = useState({});
  const abortControllerRef = useRef(null);
  const heatLayerRef = useRef(null);

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

  // 히트맵 레이어 업데이트
  useEffect(() => {
    if (!map) return;

    // 기존 히트맵 레이어 제거
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }

    // 히트맵 데이터 생성: [lat, lng, intensity] 형식
    const heatData = Object.values(globalEvents).map((event) => [
      event.latitude,
      event.longitude,
      event.intensity || 1.0, // intensity (필요에 따라 조정 가능)
    ]);

    // 히트맵 데이터가 있을 때만 레이어 생성
    if (heatData.length > 0) {
      const heatLayer = L.heatLayer(heatData, {
        radius: 15,
        blur: 20,
        maxZoom: 17,
        max: 1.0,
        gradient: {
          0.4: 'blue',
          0.6: 'cyan',
          0.7: 'lime',
          0.8: 'yellow',
          1.0: 'red'
        }
      });
      heatLayer.addTo(map);
      heatLayerRef.current = heatLayer;
    }

    // 클린업
    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
        heatLayerRef.current = null;
      }
    };
  }, [map, globalEvents]);

  return null;
}