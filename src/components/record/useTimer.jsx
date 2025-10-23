import { useEffect, useRef, useState } from 'react';
import useDriveStore from '@/stores/useDriveStore';

export default function useTimer() {
  const driveStartTime = useDriveStore((state) => state.driveStartTime);
  const [elapsed, setElapsed] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (driveStartTime) {
        const start = new Date(driveStartTime).getTime();
        const now = Date.now();
        setElapsed(((now - start) / 1000).toFixed(1));
      }
      frameRef.current = requestAnimationFrame(update);
    };

    if (driveStartTime) {
      update();
    } else {
      cancelAnimationFrame(frameRef.current);
      setElapsed(0);
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [driveStartTime]);

  return elapsed;
}