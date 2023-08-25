import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';

type Props = {
  hidden?: boolean;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
} & React.ComponentPropsWithRef<'div'>;

export default function Popover({
  className,
  onMouseLeave,
  onMouseEnter,
}: Props) {
  const logout = useAuthStore.useLogout();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <div
      id='userDropdown'
      className={clsxm(
        'flex flex-col bg-white divide-y divide-gray-300 rounded-lg shadow-xl w-44 overflow-hidden',
        className
      )}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <div className='flex flex-col justify-center hover:bg-gray-200 w-full p-3'>
        <Typography variant='p3'>Name</Typography>
        <Typography variant='p3' weight='semibold'>
          email@gmail.com
        </Typography>
      </div>
      {/* role admin */}
      <div
        className='flex flex-col justify-center hover:bg-gray-200 w-full p-3 hover:cursor-pointer'
        onClick={() => router.push('/admin')}
      >
        <Typography variant='p3' weight='semibold'>
          Dashboard
        </Typography>
      </div>
      {/* until here */}
      <div
        className='flex flex-col justify-center hover:bg-gray-200 w-full p-3 hover:cursor-pointer'
        onClick={handleLogout}
      >
        <Typography variant='p3' weight='semibold' color='danger'>
          Log Out
        </Typography>
      </div>
    </div>
  );
}
