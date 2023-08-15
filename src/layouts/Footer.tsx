import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { events } from '@/contents/event';
import { quickLinks, socials } from '@/contents/footer';

export default function Footer() {
  return (
    <footer className='w-full bg-typo-primary z-[100]'>
      <div className='flex flex-col gap-6 py-12 layout divide-y divide-typo-secondary'>
        <div className='flex flex-col md:flex-row justify-between gap-6 items-start md:pb-20'>
          <div className='flex flex-row items-center gap-4'>
            <NextImage
              src='/images/logo.png'
              alt='logo'
              width='42'
              height='37'
            ></NextImage>
            <Typography
              font='atmospheric'
              variant='p'
              color='white'
              className='text-lg'
            >
              SeTicket 2023
            </Typography>
          </div>
          <div className='flex flex-col gap-6 md:gap-24 md:flex-row'>
            <div className='flex flex-col'>
              <Typography
                font='inter'
                color='secondary'
                variant='c1'
                weight='semibold'
                className='text-sm'
              >
                EVENTS
              </Typography>
              <ul className='flex flex-col mt-2.5 gap-y-2.5'>
                {events.map((event) => (
                  <li key={event.name}>
                    <UnstyledLink href={event.href}>
                      <Typography
                        font='inter'
                        color='inline'
                        variant='c1'
                        weight='semibold'
                        className='hover:text-typo-white text-sm'
                      >
                        SeTicket&nbsp;
                        <span className={`${event.color} ${event.hover}`}>
                          {event.name}
                        </span>
                      </Typography>
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col'>
              <Typography
                font='inter'
                color='secondary'
                variant='c1'
                weight='semibold'
                className='text-sm'
              >
                QUICK LINK
              </Typography>
              <ul className='flex flex-col mt-2.5 gap-y-2.5'>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <UnstyledLink href={link.href}>
                      <Typography
                        font='inter'
                        color='inline'
                        variant='c1'
                        weight='semibold'
                        className='hover:text-typo-white text-sm'
                      >
                        {link.name}
                      </Typography>
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className='hidden md:block' />
          </div>
        </div>

        <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-6'>
          <Typography color='white' variant='btn' className='text-base'>
            &copy; SeTicket 2023
          </Typography>
          <div className='flex flex-row items-center gap-4 text-typo-primary'>
            {socials.map((social) => (
              <UnstyledLink
                key={social.name}
                href={social.href}
                className='flex justify-center items-center w-10 h-10 rounded-full bg-typo-white hover:bg-typo-light'
              >
                <social.icon size='20' />
              </UnstyledLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
