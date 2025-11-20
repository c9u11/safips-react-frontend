import { useMemo, useRef, useEffect, useState } from "react";

export default function ShakeGraph() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 100 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(rect.width, 200),
          height: Math.max(rect.height, 100)
        });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const { width, height } = dimensions;

  // 임의의 흔들림 데이터 생성 (시간에 따른 흔들린 정도)
  const data = useMemo(() => {
    const points = 20;
    const maxShake = 100;
    return Array.from({ length: points }, (_, i) => {
      const x = (i / (points - 1)) * width;
      // 자연스러운 흔들림 패턴을 위한 사인파 + 랜덤 노이즈
      const base = Math.sin((i / points) * Math.PI * 4) * 30 + 50;
      const noise = (Math.random() - 0.5) * 20;
      const y = height - ((base + noise) / maxShake) * height;
      return { x, y };
    });
  }, [width, height]);

  // 부드러운 곡선을 위한 베지어 곡선 path 생성
  const pathData = useMemo(() => {
    if (data.length < 2) return "";

    const first = data[0];
    let path = `M ${first.x} ${first.y}`;

    // Catmull-Rom 스플라인을 베지어 곡선으로 변환
    for (let i = 0; i < data.length - 1; i++) {
      const p0 = i > 0 ? data[i - 1] : data[i];
      const p1 = data[i];
      const p2 = data[i + 1];
      const p3 = i < data.length - 2 ? data[i + 2] : data[i + 1];

      // Catmull-Rom 스플라인의 제어점 계산
      const tension = 0.5;
      const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  }, [data]);

  // 그래디언트 영역 path (아래쪽으로 닫힌 영역)
  const areaPath = useMemo(() => {
    if (data.length === 0) return "";
    const first = data[0];
    const last = data[data.length - 1];
    return `${pathData} L ${last.x} ${height} L ${first.x} ${height} Z`;
  }, [pathData, data, height]);

  // 마커를 표시할 지점 인덱스 (2곳)
  const markerIndices = useMemo(() => {
    return [5, 10];
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {/* 그래디언트 정의 */}
        <defs>
          <linearGradient id="shakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#72D9FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* 그래디언트로 채워진 영역 */}
        <path d={areaPath} fill="url(#shakeGradient)" />

        {/* 라인 */}
        <path
          d={pathData}
          fill="none"
          stroke="#72D9FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 마커 지점에 ! 표시 */}
        {markerIndices.map((index) => {
          if (index >= data.length) return null;
          const point = data[index];
          return (
            <g key={index}>
              {/* 원형 배경 */}
              <circle cx={point.x} cy={10} r="8" fill="#72D9FF" />
              {/* ! 텍스트 */}
              <text
                x={point.x}
                y={11}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#171717"
                fontSize="8"
                fontWeight="bold"
              >
                !
              </text>
              {/* 세로 점선 */}
              <line
                x1={point.x}
                y1={10}
                x2={point.x}
                y2={height}
                stroke="#72D9FF"
                strokeWidth="1"
                strokeDasharray="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.5"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
