import { create } from 'zustand';
import { reqPostDriveStart, reqPostDriveStop, reqPostDriveSensor } from '@/apis/drive';

export const useDriveStore = create((set, get) => ({
  driveId: null,
  accelerationX: 0,
  accelerationY: 0,
  accelerationZ: 0,
  gyroscopeX: 0,
  gyroscopeY: 0,
  gyroscopeZ: 0,
  driveHistory: [],
  driveInterval: null,

  setGyroscopeData: (data) => set({
    gyroscopeX: data.gyroscopeX,
    gyroscopeY: data.gyroscopeY,
    gyroscopeZ: data.gyroscopeZ,
  }),
  setAccelerationData: (data) => set({
    accelerationX: data.accelerationX,
    accelerationY: data.accelerationY,
    accelerationZ: data.accelerationZ,
  }),
  startDrive: async () => {
    set({ driveId: null, driveInterval: null, driveHistory: [] });
    const response = await reqPostDriveStart();
    set({
      driveId: response.id,
      driveInterval: setInterval(async () => {
        if (("geolocation" in navigator)) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const sensorData = {
              gyroscopeX: get().gyroscopeX,
              gyroscopeY: get().gyroscopeY,
              gyroscopeZ: get().gyroscopeZ,
              accelerationX: get().accelerationX,
              accelerationY: get().accelerationY,
              accelerationZ: get().accelerationZ,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date().toISOString(),
            };
            set({ driveHistory: [...get().driveHistory, sensorData] });
          });
        }
      }, 100),
    });

  },
  stopDrive: async () => {
    if (!get().driveId) return;

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
      set({ driveId: null, driveInterval: null });
    }
  },
}));

export default useDriveStore;