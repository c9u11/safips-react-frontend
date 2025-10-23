import Controller from '@/components/record/Controller';
import Status from '@/components/record/Status';

export default function Home() {

  return (
    <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
      <Status />
      <Controller />
    </div>
  );
}