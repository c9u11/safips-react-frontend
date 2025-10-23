import useDriveStore from '@/stores/useDriveStore';
import useTimer from './useTimer';

export default function Status() {
  const driveStatus = useDriveStore((state) => state.driveStatus);
  const elapsed = useTimer();
  return (
    <div>
      <p>{driveStatus === 'recording' ? '측정 중' : '측정 중지'}</p>
      <p>시간: {elapsed}s</p>
    </div>
  );
}