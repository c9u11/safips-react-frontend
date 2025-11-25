import { useMemo, useRef, useEffect, useState } from "react";

export default function ShakeGraph({ data }) {
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

  // 데이터를 SVG 좌표계로 정규화
  const normalizedData = useMemo(() => {
    if (!data || data.length < 2) return [];

    // x, y의 최소/최대값 계산
    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // 범위 계산 (0으로 나누기 방지)
    const xRange = maxX - minX || 1;
    const yRange = maxY - minY || 1;

    // SVG 좌표계로 정규화
    // x: 0 ~ width, y: height ~ 0 (SVG는 위에서 아래로 증가하므로 뒤집음)
    return data.map(point => ({
      x: ((point.x - minX) / xRange) * width,
      y: height - ((point.y - minY) / yRange) * height
    }));
  }, [data, width, height]);

  // 부드러운 곡선을 위한 베지어 곡선 path 생성
  const pathData = useMemo(() => {
    if (!normalizedData || normalizedData.length < 2) return "";

    const first = normalizedData[0];
    let path = `M ${first.x} ${first.y}`;

    // Catmull-Rom 스플라인을 베지어 곡선으로 변환
    for (let i = 0; i < normalizedData.length - 1; i++) {
      const p0 = i > 0 ? normalizedData[i - 1] : normalizedData[i];
      const p1 = normalizedData[i];
      const p2 = normalizedData[i + 1];
      const p3 = i < normalizedData.length - 2 ? normalizedData[i + 2] : normalizedData[i + 1];

      // Catmull-Rom 스플라인의 제어점 계산
      const tension = 0.5;
      const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  }, [normalizedData]);

  // 그래디언트 영역 path (아래쪽으로 닫힌 영역)
  const areaPath = useMemo(() => {
    if (!normalizedData || normalizedData.length === 0) return "";
    const first = normalizedData[0];
    const last = normalizedData[normalizedData.length - 1];
    return `${pathData} L ${last.x} ${height} L ${first.x} ${height} Z`;
  }, [pathData, normalizedData, height]);

  // 마커를 표시할 지점 인덱스 (2곳)
  const markerIndices = useMemo(() => {
    return [];
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
          if (!normalizedData || index >= normalizedData.length) return null;
          const point = normalizedData[index];
          return (
            <g key={index}>
              {/* 원형 배경 */}
              <circle cx={point.x} cy={point.y} r="8" fill="#72D9FF" />
              {/* ! 텍스트 */}
              <text
                x={point.x}
                y={point.y + 1}
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
                y1={point.y}
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
