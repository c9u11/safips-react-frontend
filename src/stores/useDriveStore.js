import { create } from 'zustand';
import { reqPostDriveStart, reqPostDriveStop, reqPostDriveSensor } from '@/apis/drive';
import { requestSensorPermissions, addSensorListeners, removeSensorListeners } from '@/utils/sensor';
import { calculateDistance, calculateSpeed, calculateCalories } from '@/utils/calculate';

export const useDriveStore = create((set, get) => ({
  driveId: null,
  driveStatus: 'idle',
  driveStartTime: null,
  accelerationX: 0,
  accelerationY: 0,
  accelerationZ: 0,
  accelerationTimestamp: null,
  gyroscopeX: 0,
  gyroscopeY: 0,
  gyroscopeZ: 0,
  gyroscopeTimestamp: null,
  driveHistory: [],
  driveInterval: null,
  distance: 0.00,
  currentSpeed: 0.00,
  totalCalories: 0.0,

  motionHandler: (event) => {
    set({
      accelerationX: event.acceleration.x,
      accelerationY: event.acceleration.y,
      accelerationZ: event.acceleration.z,
      accelerationTimestamp: new Date().toISOString(),
    });
  },
  orientationHandler: (event) => {
    set({
      gyroscopeX: event.alpha,
      gyroscopeY: event.beta,
      gyroscopeZ: event.gamma,
      gyroscopeTimestamp: new Date().toISOString(),
    });
  },
  addSensorDataToDriveHistory: async () => {
    if (("geolocation" in navigator)) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const sensorData = {
          gyroscopeX: get().gyroscopeX,
          gyroscopeY: get().gyroscopeY,
          gyroscopeZ: get().gyroscopeZ,
          gyroscopeTimestamp: get().gyroscopeTimestamp,
          accelerationX: get().accelerationX,
          accelerationY: get().accelerationY,
          accelerationZ: get().accelerationZ,
          accelerationTimestamp: get().accelerationTimestamp,
          latitude: latitude,
          longitude: longitude,
          timestamp: new Date().toISOString(),
        };
        const driveId = get().driveId;
        const currentHistory = get().driveHistory;
        const newHistory = [...currentHistory, sensorData];

        const lastLocation = currentHistory.length > 0 ? currentHistory[currentHistory.length - 1] : null;
        const previousDistance = get().distance;
        const distance = lastLocation ? calculateDistance(lastLocation.latitude, lastLocation.longitude, latitude, longitude) : 0;
        const currentSpeed = calculateSpeed(distance, new Date().getTime() - new Date(lastLocation?.timestamp).getTime());
        const totalCalories = calculateCalories(previousDistance + distance);
        console.log(previousDistance, distance);
        set({ distance: previousDistance + distance, currentSpeed: currentSpeed, totalCalories: totalCalories });

        if (newHistory.length > 100) {
          try {
            reqPostDriveSensor(driveId, { sensorLocationData: newHistory });
            set({ driveHistory: [] });
          } catch (error) {
            set({ driveHistory: newHistory });
          }
        } else {
          set({ driveHistory: newHistory });
        }
      });
    }
  },
  startDrive: async () => {
    if (get().driveStatus !== 'idle') return;

    const permissions = await requestSensorPermissions();
    const allGranted = Object.values(permissions).every(permission => permission === 'granted' || permission === 'not-supported');
    if (!allGranted) return new Error('권한이 거절되었습니다.');

    set({ driveId: null, driveInterval: null, driveHistory: [], driveStatus: 'recording', driveStartTime: new Date().toISOString() });

    addSensorListeners(get().motionHandler, get().orientationHandler);

    const response = await reqPostDriveStart();
    if (isNaN(response.id)) return new Error('시작에 실패했습니다.');
    set({
      driveId: response.id,
      driveInterval: setInterval(get().addSensorDataToDriveHistory, 100),
    });

  },
  stopDrive: async () => {
    if (get().driveStatus !== 'recording') return;

    const driveInterval = get().driveInterval;
    clearInterval(driveInterval);

    try {
      const driveId = get().driveId;
      const driveHistory = get().driveHistory;
      await reqPostDriveSensor(driveId, { sensorLocationData: driveHistory });
      await reqPostDriveStop(driveId);
    } catch (error) {
      console.error(error);
    } finally {
      set({ driveId: null, driveInterval: null, driveStatus: 'idle', driveStartTime: null });
    }
  },
}));

export default useDriveStore;