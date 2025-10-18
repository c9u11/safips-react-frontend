import { useEffect, useState } from 'react';

export default function Home() {
  const [deviceMotion, setDeviceMotion] = useState(null);
  const [deviceOrientation, setDeviceOrientation] = useState(null);
  useEffect(() => {
    const handleDeviceMotion = (event) => {
      console.log(event);
      setDeviceMotion(event.acceleration);
    };
    const handleDeviceOrientation = (event) => {
      console.log(event);
      setDeviceOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        absolute: event.absolute,
        x: event.x,
        y: event.y,
        z: event.z,
        timeStamp: event.timeStamp,
        rotationRate: event.rotationRate,
        interval: event.interval,
        screenX: event.screenX,
        screenY: event.screenY,
      });
    };
    window.addEventListener('devicemotion', handleDeviceMotion);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);
  return <div>
    <div>
      <h1>Device Motion</h1>
      <p>{deviceMotion?.acceleration?.x}</p>
      <p>{deviceMotion?.acceleration?.y}</p>
      <p>{deviceMotion?.acceleration?.z}</p>
    </div>
    <div>
      <h1>Device Orientation</h1>
      <p>{deviceOrientation?.alpha}</p>
      <p>{deviceOrientation?.beta}</p>
      <p>{deviceOrientation?.gamma}</p>
    </div>
  </div>;
}