import { tryCatchHandler } from '@/utils/error';
import useDriveStore from '@/stores/useDriveStore';
import useLockStore from '@/stores/useLockStore';
import { IoLockOpen, IoLockClosed, IoPlay, IoStop, IoPause } from "react-icons/io5";

export default function Controller() {
  const startDrive = useDriveStore((state) => state.startDrive);
  const stopDrive = useDriveStore((state) => state.stopDrive);
  const driveStatus = useDriveStore((state) => state.driveStatus);
  const { isLocked, lockHandler, unlockHandler } = useLockStore();


  const startHandler = () => tryCatchHandler(startDrive);
  const stopHandler = () => tryCatchHandler(stopDrive);

  return (
    <div className='flex gap-6 items-center justify-center'>
      <button className='rounded-full bg-[#424242] w-20 h-20 flex items-center justify-center' onClick={isLocked ? unlockHandler : lockHandler}>
        {
          isLocked ?
          <IoLockOpen className="size-6 fill-[#d4d4d8]" /> : 
          <IoLockClosed className="size-6 fill-[#d4d4d8]"/>
        }
        </button>
      <button className='rounded-full bg-[#72D9FF] w-25 h-25 flex items-center justify-center disabled:opacity-50 disabled:bg-[#424242] ' disabled={isLocked} onClick={startHandler}>
        {
          driveStatus === 'idle' ? 
          <IoPlay className="size-12 ml-1 fill-[#1c1c1c]" /> : 
          <IoPause className="size-12 fill-[#1c1c1c]"  />
        }
        </button>
      <button className='rounded-full bg-[#424242] w-20 h-20 flex items-center justify-center disabled:opacity-50 disabled:[&>svg]:fill-[#1c1c1c]' disabled={isLocked} onClick={stopHandler}>
      {
          driveStatus === 'idle' ? 
          <IoStop className="size-7 fill-[#898989]" /> : 
          <IoStop className="size-7 fill-[#d4d4d8]" />
        }
        
      </button>
    </div>
  );
}