import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';

type Props = {
  hidden?: boolean;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  handleLogOutNavbar?: (() => void) | undefined;
} & React.ComponentPropsWithRef<'div'>;

export default function Popover({
  className,
  onMouseLeave,
  onMouseEnter,
  handleLogOutNavbar,
}: Props) {
  const logout = useAuthStore.useLogout();
  const router = useRouter();
  const handleLogout = () => {
    handleLogOutNavbar && handleLogOutNavbar();
    logout();
    router.replace('/');
  };

  const user = useAuthStore.useUser();

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
      <div className='flex justify-center hover:bg-gray-200 w-full p-3'>
        <Typography variant='p3' className='mr-1'>
          Welcome,{' '}
        </Typography>
        <Typography variant='p3' weight='semibold'>
          {user?.username}
        </Typography>
      </div>
      {/* role admin */}
      {user?.role === 'ADMIN' && (
        <div
          className='flex flex-col justify-center hover:bg-gray-200 w-full p-3 hover:cursor-pointer'
          onClick={() => router.push('/admin')}
        >
          <Typography variant='p3' weight='semibold'>
            Dashboard
          </Typography>
        </div>
      )}
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
