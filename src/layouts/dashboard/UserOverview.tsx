import { BsPeopleFill } from 'react-icons/bs';

import Typography from "@/components/Typography";
import clsxm from '@/lib/clsxm';

type Props = {
  className?: string;
};

export default function UsersOverview({className}: Props) {
  return (
    <div className={clsxm("flex flex-col justify-center md:px-10 md:py-5 w-full rounded-3xl bg-gradient-to-br from-gradient-500 to-gradient-600", className)}>
      <Typography
        variant='h4'
        font="ubuntu"
        color="white"
        className='flex items-center'
      >
        <BsPeopleFill className='inline-block mr-3'/> Users Overview
      </Typography>

      <hr className="h-px my-3 border-0 bg-white" />

    </div>
  );
}