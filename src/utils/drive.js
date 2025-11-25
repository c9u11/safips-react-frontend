// LTTB (Largest-Triangle-Three-Buckets) 알고리즘
// 시계열 데이터를 다운샘플링하여 중요한 포인트만 선택
const lttb = (data, threshold) => {
  if (!data || data.length <= threshold) {
    return data;
  }

  const dataLength = data.length;
  if (threshold >= dataLength || threshold === 0) {
    return data;
  }

  // 첫 번째와 마지막 포인트는 항상 포함
  const sampled = [data[0]];
  const every = (dataLength - 2) / (threshold - 2);
  let a = 0;

  for (let i = 0; i < threshold - 2; i++) {
    const rangeStart = Math.floor((i + 1) * every) + 1;
    const rangeEnd = Math.min(Math.floor((i + 2) * every) + 1, dataLength);

    let avgX = 0;
    let avgY = 0;
    let avgRangeStart = Math.floor((i) * every) + 1;
    let avgRangeEnd = Math.min(Math.floor((i + 1) * every) + 1, dataLength);

    for (let j = avgRangeStart; j < avgRangeEnd; j++) {
      avgX += data[j].x;
      avgY += data[j].y;
    }
    avgX /= (avgRangeEnd - avgRangeStart);
    avgY /= (avgRangeEnd - avgRangeStart);

    let maxArea = -1;
    let maxAreaIndex = rangeStart;

    for (let j = rangeStart; j < rangeEnd; j++) {
      const area = Math.abs(
        (data[a].x - avgX) * (data[j].y - data[a].y) -
        (data[a].x - data[j].x) * (avgY - data[a].y)
      );
      if (area > maxArea) {
        maxArea = area;
        maxAreaIndex = j;
      }
    }

    sampled.push(data[maxAreaIndex]);
    a = maxAreaIndex;
  }

  sampled.push(data[dataLength - 1]);
  return sampled;
};

export const getDrivePositionsAndImpactValues = (route, threshold = 100) => {
  const { nodes } = route;
  const positions = [];
  const allImpactValues = [];

  // 모든 노드에서 impactValue 추출
  nodes.forEach((node) => {
    positions.push([node.latitude, node.longitude]);
    allImpactValues.push({
      x: new Date(node.timestamp).getTime(),
      y: node.impactValue
    });
  });

  // LTTB 알고리즘 적용하여 다운샘플링
  const impactValues = lttb(allImpactValues, threshold);

  return { positions, impactValues };
}