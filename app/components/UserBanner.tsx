import Image from 'next/image';
import UserImage from '../../public/user-picture.png';

interface UserBannerProps {
  user?: {
    name?: string;
    full_name?: string;
  };
  status: string;
}

const UserBanner = ({ user, status }: UserBannerProps) => {
  return (
    <div id="user-banner" className='w-full flex items-center gap-5 sora'>
      <div className='w-[46px] aspect-square'>
        <Image src={UserImage} className='rounded-[50%]' alt='user image'/>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-[14px]/[12px] font-semibold capitalize'>
          {`Hey ${status === "authenticated" ? user?.name || user?.full_name : "Loading..."} `}
        </p>
        <p id="" className="font-normal text-[10px]/[12.6px]">Welcome back to learning!!</p> 
      </div>
    </div>
  );
};

export default UserBanner; 