import { useQuery } from '@tanstack/react-query';
import { BsBellFill } from 'react-icons/bs';

import TextLine from '@/components/TextLine';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { ApiReturn } from '@/types/api';

type Props = {
  className?: string;
};

type ActivityUser = {
  message: string;
  timestamp: string;
};

export default function Notifications({ className }: Props) {
  const activities = useQuery<ApiReturn<ActivityUser[]>>([`/users/activity`]);

  return (
    <div
      className={clsxm(
        'flex flex-col justify-center p-4 md:px-10 md:py-5 w-full rounded-3xl bg-gradient-to-br from-gradient-500 to-gradient-600',
        className
      )}
    >
      <Typography
        variant='h4'
        font='ubuntu'
        color='white'
        className='flex items-center'
      >
        <BsBellFill className='inline- mr-3' /> Notifications
      </Typography>

      <hr className='h-px my-3 border-0 bg-white' />

      <div>
        {activities.data?.data.map((activity) => (
          <TextLine className='my-2' key={activity.message}>
            {activity.message} - {activity.timestamp}
          </TextLine>
        ))}
      </div>
    </div>
  );
}
