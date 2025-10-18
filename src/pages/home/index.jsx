import { useEffect, useState } from 'react';

export default function Home() {
  const [deviceMotion, setDeviceMotion] = useState(null);
  const [deviceOrientation, setDeviceOrientation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('pending');
  const [error, setError] = useState(null);

  const requestPermissions = async () => {
    try {
      setError(null);
      setPermissionStatus('requesting');

      // Device Motion 권한 요청
      if (typeof DeviceMotionEvent !== 'undefined' && DeviceMotionEvent.requestPermission) {
        const motionPermission = await DeviceMotionEvent.requestPermission();
        console.log('Motion permission:', motionPermission);
        if (motionPermission !== 'granted') {
          throw new Error('Device Motion permission denied');
        }
      }

      // Device Orientation 권한 요청
      if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
        const orientationPermission = await DeviceOrientationEvent.requestPermission();
        console.log('Orientation permission:', orientationPermission);
        if (orientationPermission !== 'granted') {
          throw new Error('Device Orientation permission denied');
        }
      }

      setPermissionStatus('granted');
      alert('권한이 허용되었습니다!');
    } catch (err) {
      console.error('Permission error:', err);
      setError(err.message);
      setPermissionStatus('denied');
      alert('권한이 거부되었습니다: ' + err.message);
    }
  };

  useEffect(() => {
    const handleDeviceMotion = (event) => {
      console.log('Motion event:', event);
      setDeviceMotion(event.acceleration);
    };

    const handleDeviceOrientation = (event) => {
      console.log('Orientation event:', event);
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

    // 권한이 허용된 경우에만 이벤트 리스너 추가
    if (permissionStatus === 'granted') {
      window.addEventListener('devicemotion', handleDeviceMotion, true);
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
      console.log('Event listeners added');
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [permissionStatus]);
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Device Sensors Test</h1>

      {/* 권한 상태 및 요청 버튼 */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>권한 상태</h2>
        <p>상태: {permissionStatus === 'pending' ? '대기중' : permissionStatus === 'requesting' ? '요청중' : permissionStatus === 'granted' ? '허용됨' : '거부됨'}</p>
        {error && <p style={{ color: 'red' }}>에러: {error}</p>}
        {permissionStatus !== 'granted' && (
          <button
            onClick={requestPermissions}
            disabled={permissionStatus === 'requesting'}
            style={{
              padding: '10px 20px',
              backgroundColor: permissionStatus === 'requesting' ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: permissionStatus === 'requesting' ? 'not-allowed' : 'pointer'
            }}
          >
            {permissionStatus === 'requesting' ? '권한 요청중...' : '센서 권한 요청'}
          </button>
        )}
      </div>

      {/* Device Motion 데이터 */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Device Motion</h2>
        {permissionStatus === 'granted' ? (
          <div>
            <p>X: {deviceMotion?.x?.toFixed(2) || 'N/A'}</p>
            <p>Y: {deviceMotion?.y?.toFixed(2) || 'N/A'}</p>
            <p>Z: {deviceMotion?.z?.toFixed(2) || 'N/A'}</p>
          </div>
        ) : (
          <p>권한이 허용되지 않았습니다.</p>
        )}
      </div>

      {/* Device Orientation 데이터 */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Device Orientation</h2>
        {permissionStatus === 'granted' ? (
          <div>
            <p>Alpha: {deviceOrientation?.alpha?.toFixed(2) || 'N/A'}</p>
            <p>Beta: {deviceOrientation?.beta?.toFixed(2) || 'N/A'}</p>
            <p>Gamma: {deviceOrientation?.gamma?.toFixed(2) || 'N/A'}</p>
          </div>
        ) : (
          <p>권한이 허용되지 않았습니다.</p>
        )}
      </div>
    </div>
  );
}