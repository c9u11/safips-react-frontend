import useDriveStore from '@/stores/useDriveStore';
import useTimer from './useTimer';
import MainItem from './MainItem';
import SubItem from './SubItem';
import {LuBike} from "react-icons/lu";
import { MdOutlineSpeed } from "react-icons/md";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineFire } from "react-icons/ai";

export default function Status() {
  const driveStatus = useDriveStore((state) => state.driveStatus);
  const elapsed = useTimer();
  return (
    <div className='flex flex-col gap-10'>
      {/* <p>{driveStatus === 'recording' ? '측정 중' : '측정 중지'}</p>
      <p>시간: {elapsed}s</p> */}
      <MainItem icon={<LuBike className='text-4xl text-[#72D9FF]'/>} title={'거리(km)'} value={'0.00'}/>
      <div className='flex w-full justify-center gap-12 px-12'>
        <SubItem icon={<MdOutlineSpeed className='text-xl'/>} title={'평균속도'} value={`8'55"`}/>
        <SubItem icon={<RiTimerLine className='text-xl'/>} title={'시간'} value={elapsed}/>
        <SubItem icon={<AiOutlineFire className='text-xl'/>} title={'칼로리'} value={`170`}/>
      </div>
    </div>
  );
}