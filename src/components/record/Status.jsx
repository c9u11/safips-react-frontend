import useDriveStore from '@/stores/useDriveStore';
import useTimer from './useTimer';
import MainItem from './MainItem';
import SubItem from './SubItem';
import { LuBike } from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineFire } from "react-icons/ai";

export default function Status() {
  const distance = useDriveStore((state) => state.distance);
  const currentSpeed = useDriveStore((state) => state.currentSpeed);
  const totalCalories = useDriveStore((state) => state.totalCalories);
  const elapsed = useTimer();
  return (
    <div className='flex flex-col gap-10'>
      <MainItem icon={<LuBike className='text-4xl text-[#72D9FF]' />} title={'거리(km)'} value={distance.toFixed(2)} />
      <div className='flex w-full justify-center gap-12 px-12'>
        <SubItem icon={<MdOutlineSpeed className='text-xl' />} title={'현재 속도'} value={currentSpeed.toFixed(2)} />
        <SubItem icon={<RiTimerLine className='text-xl' />} title={'시간'} value={elapsed} />
        <SubItem icon={<AiOutlineFire className='text-xl' />} title={'칼로리'} value={totalCalories.toFixed(1)} />
      </div>
    </div>
  );
}