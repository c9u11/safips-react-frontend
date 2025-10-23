import { tryCatchHandler } from '@/utils/error';
import useDriveStore from '@/stores/useDriveStore';
import useLockStore from '@/stores/useLockStore';

export default function Controller() {
  const startDrive = useDriveStore((state) => state.startDrive);
  const stopDrive = useDriveStore((state) => state.stopDrive);
  const driveStatus = useDriveStore((state) => state.driveStatus);
  const { isLocked, lockHandler, unlockHandler } = useLockStore();


  const startHandler = () => tryCatchHandler(startDrive);
  const stopHandler = () => tryCatchHandler(stopDrive);

  return (
    <div className='flex gap-2'>
      <button className='bg-blue-500 text-white p-2 rounded-md' onClick={isLocked ? unlockHandler : lockHandler}>{isLocked ? '잠금 해제' : '잠금'}</button>
      <button className='bg-blue-500 text-white p-2 rounded-md disabled:opacity-50' disabled={isLocked} onClick={startHandler}>{driveStatus === 'idle' ? '시작' : '일시 정지'}</button>
      <button className='bg-blue-500 text-white p-2 rounded-md disabled:opacity-50' disabled={isLocked} onClick={stopHandler}>종료</button>
    </div>
  );
}