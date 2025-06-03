import Image from 'next/image';
import completedIcon from '../../public/completed-icon.svg';
import completedBg from '../../public/award.svg';
import timeIcon from '../../public/time-icon.svg';
import timeBg from '../../public/timer.svg';
import LoadingSpinner from './LoadingSpinner';

interface StatusSectionProps {
  totalCompletedTutorials: number;
  totalTime: number;
  tutorialLoading: boolean;
}

const StatusSection = ({ totalCompletedTutorials, totalTime, tutorialLoading }: StatusSectionProps) => {
  return (
    <section id='status-section' className='w-full h-auto flex justify-between items-center sora'>
      <div id='completed-bar' className='relative overflow-hidden bg-[#A5C69D] w-[45%] rounded-xl ps-3 pe-0 py-3 flex flex-col gap-1'>
        <Image src={completedBg} className='absolute -right-0 -top-0' alt='background award icon'/>
        <Image src={completedIcon} alt='completed icon' className=''/>
        <p className='uppercase text-[#16430C] text-[11px]/[13.86px] font-extrabold'>Completed</p>
        <div className="font-normal text-[9px]/[12px] text-[#292828] flex items-center gap-[3px]">
          <span className='text-[#292828] font-bold'>
            {tutorialLoading ? <LoadingSpinner/> : totalCompletedTutorials}
          </span>
          Tutorial(s)
        </div>
      </div>
      <div id='timespent-bar' className='relative overflow-hidden bg-[#A1A8BC] w-[45%] rounded-xl ps-3 pe-0 py-3 flex flex-col gap-1'>
        <Image src={timeBg} alt='timer background icon' className='absolute -right-0 -top-0' />
        <Image src={timeIcon} alt='timer icon' className='' />
        <p className="uppercase text-[#16430C] text-[11px]/[13.86px] font-extrabold ">TIME SPENT</p>
        <p className='font-semibold text-[9px]/[12px] text-[#292828]'>
          <span>{Math.floor(totalTime / 60)}</span>
          <span className="font-normal mr-1">m</span>
        </p>
      </div>
    </section>
  );
};

export default StatusSection; 