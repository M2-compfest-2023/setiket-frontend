import { CgClose } from 'react-icons/cg';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';

type Props = {
  handleLogout?: () => void;
  toggleShowNav?: () => void;
  isOpen?: boolean;
  isLogin?: boolean;
} & React.ComponentPropsWithRef<'button'>;

export default function MobileNavbar({
  handleLogout,
  toggleShowNav,
  isOpen,
  isLogin,
}: Props) {
  const user = useAuthStore.useUser();

  return (
    <div
      className={clsxm(
        'fixed left-0 top-0 flex flex-col items-center gap-12',
        'w-full h-screen px-4 py-10 md:hidden bg-white',
        'transition ease-in-out duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className='flex justify-between w-full'>
        <UnstyledLink
          href='/'
          className='flex flex-row items-center gap-2 md:gap-4'
        >
          <NextImage src='/images/logo.png' alt='logo' width={42} height={42} />
          <Typography font='ubuntu' variant='h4' color='cyan'>
            SeTicket 2023
          </Typography>
        </UnstyledLink>

        <IconButton
          variant='label'
          icon={CgClose}
          size='lg'
          className='border-transparent bg-transparent rounded-full sm:hidden'
          iconClassName='text-gray-500 hover:text-slate-800'
          onClick={toggleShowNav}
        />
      </div>

      <nav className='flex-1 w-full'>
        <div className='space-y-4 flex flex-col justify-between h-full'>
          <ul className='space-y-4 w-full text-base p-2.5'>
            <li>
              <UnstyledLink href='/'>
                <Typography
                  font='inter'
                  color='cyan'
                  variant='p1'
                  weight='medium'
                  className='hover:text-slate-700'
                >
                  Home
                </Typography>
              </UnstyledLink>
            </li>
            <li>
              <UnstyledLink href='/events'>
                <Typography
                  font='inter'
                  color='cyan'
                  variant='p1'
                  weight='medium'
                  className='hover:text-slate-700'
                >
                  Events
                </Typography>
              </UnstyledLink>
            </li>
            {isLogin && user?.role === 'CUSTOMER' && (
              <li>
                <UnstyledLink href='/mytickets'>
                  <Typography
                    font='inter'
                    color='cyan'
                    variant='p1'
                    weight='medium'
                    className='hover:text-slate-700'
                  >
                    My Tickets
                  </Typography>
                </UnstyledLink>
              </li>
            )}
            {isLogin && user?.role === 'EVENTORGANIZER' && (
              <li>
                <UnstyledLink href='/myevents'>
                  <Typography
                    font='inter'
                    color='cyan'
                    variant='p1'
                    weight='medium'
                    className='hover:text-slate-700'
                  >
                    My Events
                  </Typography>
                </UnstyledLink>
              </li>
            )}
          </ul>
          <div className='flex flex-col'>
            {!isLogin ? (
              <>
                <ButtonLink
                  href='/login'
                  size='lg'
                  variant='primary'
                  className='border-0 bg-typo-white'
                >
                  Login
                </ButtonLink>
                <div className='inline-flex items-center justify-center w-full'>
                  <hr className='w-64 h-px my-5 border-0 bg-gray-700' />
                  <span className='absolute px-2 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2'>
                    or
                  </span>
                </div>
                <ButtonLink
                  href='/register'
                  size='lg'
                  variant='secondary'
                  className='text-white border-0'
                >
                  Sign Up
                </ButtonLink>
              </>
            ) : (
              <>
                <div className='flex flex-col gap-5'>
                  {user?.role === 'ADMIN' && (
                    <ButtonLink
                      href='/dashboard'
                      size='lg'
                      variant='netral'
                      className='border-slate-800 text-slate-800 bg-transparent'
                    >
                      Dashboard
                    </ButtonLink>
                  )}
                  <Button
                    size='lg'
                    variant='danger'
                    className='text-white border-0'
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
