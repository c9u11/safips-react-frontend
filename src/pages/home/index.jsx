import { useEffect, useState } from 'react';
import {
  requestSensorPermissions,
  addSensorListeners,
  removeSensorListeners,
} from '@/utils/sensor';

export default function Home() {
  const [sensorData, setSensorData] = useState({
    latitude: 0.1,
    longitude: 0.1,
    accelerationX: 0.1,
    accelerationY: 0.1,
    accelerationZ: 0.1,
    gyroscopeX: 0.1,
    gyroscopeY: 0.1,
    gyroscopeZ: 0.1,
  });
  const [permissionStatus, setPermissionStatus] = useState('pending');

  const requestPermissions = async () => {
    let allGranted = false;
    try {
      setPermissionStatus('requesting');

      const permissions = await requestSensorPermissions();

      allGranted = Object.values(permissions).every(permission =>
        permission === 'granted' || permission === 'not-supported'
      );
    } finally {
      if (allGranted) setPermissionStatus('granted');
      else setPermissionStatus('denied');
    }
  };

  const motionHandler = (event) => {
    setSensorData(prev => (
      {
        ...prev,
        accelerationX: event.acceleration.x,
        accelerationY: event.acceleration.y,
        accelerationZ: event.acceleration.z,
      }))
  };
  const orientationHandler = (event) => {
    setSensorData(prev => (
      {
        ...prev,
        gyroscopeX: event.alpha,
        gyroscopeY: event.beta,
        gyroscopeZ: event.gamma,
      }))
  };

  useEffect(() => {
    if (permissionStatus !== 'granted') return;
    addSensorListeners(motionHandler, orientationHandler);
    return () => {
      removeSensorListeners(motionHandler, orientationHandler);
    };
  }, [permissionStatus]);

  return (
    <div>
      <button className='bg-blue-500 text-white p-2 rounded-md' onClick={requestPermissions}>Request Permissions</button>
      <p>
        {permissionStatus}
      </p>
      <p>
        {sensorData?.accelerationX || 'N/A'}
      </p>
      <p>
        {sensorData?.accelerationY || 'N/A'}
      </p>
      <p>
        {sensorData?.accelerationZ || 'N/A'}
      </p>
      <p>
        {sensorData?.gyroscopeX || 'N/A'}
      </p>
      <p>
        {sensorData?.gyroscopeY || 'N/A'}
      </p>
      <p>
        {sensorData?.gyroscopeZ || 'N/A'}
      </p>
    </div>
  );
}