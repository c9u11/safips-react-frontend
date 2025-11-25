export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // 지구 반지름 (m)
  const toRad = (v) => (v * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // meter
}

export function calculateSpeed(distance, time) {
  if (distance === 0 || time === 0) return 0;
  if (isNaN(distance / time)) return 0;
  return distance / time;
}

export function calculateCalories(distance) {
  if (distance === 0) return 0;
  if (isNaN(distance * 35)) return 0;
  return distance * 35;
}