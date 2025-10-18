
export const requestSensorPermissions = async () => {
  const results = {
    motion: 'not-supported',
    orientation: 'not-supported',
    location: 'not-supported'
  };

  try {
    // Device Motion 권한 요청
    if (typeof DeviceMotionEvent !== 'undefined' && DeviceMotionEvent.requestPermission) {
      results.motion = await DeviceMotionEvent.requestPermission();
      console.log('Motion permission:', results.motion);
    }

    // Device Orientation 권한 요청
    if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
      results.orientation = await DeviceOrientationEvent.requestPermission();
      console.log('Orientation permission:', results.orientation);
    }

    // Location 권한 요청
    if (navigator.geolocation) {
      try {
        await navigator.geolocation.getCurrentPosition(() => { });
        results.location = 'granted';
      } catch (error) {
        results.location = 'denied';
      }
      console.log('Location:', results.location);
    }

    return results;
  } catch (error) {
    console.error('Permission request error:', error);
    throw error;
  }
};

export const addSensorListeners = (motionHandler, orientationHandler) => {
  window.addEventListener('devicemotion', motionHandler, true);
  window.addEventListener('deviceorientation', orientationHandler, true);
  console.log('Sensor event listeners added');
};

export const removeSensorListeners = (motionHandler, orientationHandler) => {
  window.removeEventListener('devicemotion', motionHandler);
  window.removeEventListener('deviceorientation', orientationHandler);
  console.log('Sensor event listeners removed');
};