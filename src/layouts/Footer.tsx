import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { categories } from '@/contents/categories';
import { quickLinks } from '@/contents/footer';

export default function Footer() {
  return (
    <footer className='w-full bg-background-violet z-[100]'>
      <div className='flex flex-col gap-3 py-6 layout divide-y divide-typo-secondary'>
        <div className='flex flex-col md:flex-row justify-between gap-6 items-start md:pb-5'>
          <div className='flex flex-row items-center gap-4 mx-auto sm:mx-0'>
            <NextImage
              src='/images/logo.png'
              alt='logo'
              width='42'
              height='37'
            ></NextImage>
            <Typography
              font='ubuntu'
              weight='bold'
              variant='h3'
              color='white'
              className='text-lg'
            >
              SeTicket 2023
            </Typography>
          </div>
          <div className='flex flex-col gap-6 md:gap-24 md:flex-row mx-auto text-center sm:mx-0 sm:text-left'>
            <div className='flex flex-col'>
              <Typography
                font='inter'
                color='white'
                variant='b2'
                weight='semibold'
                className='text-sm'
              >
                Events
              </Typography>
              <ul className='flex flex-col mt-2.5 gap-y-2.5'>
                {categories.map((category) => (
                  <li key={category.name}>
                    <UnstyledLink href={category.href}>
                      <Typography
                        font='inter'
                        color='inline'
                        variant='p3'
                        weight='semibold'
                        className='hover:text-typo-white text-sm'
                      >
                        <span className={`${category.color} `}>
                          {category.name}
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
                color='white'
                variant='b2'
                weight='semibold'
                className='text-sm'
              >
                Quick Links
              </Typography>
              <ul className='flex flex-col mt-2.5 gap-y-2.5'>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <UnstyledLink href={link.href}>
                      <Typography
                        font='inter'
                        color='inline'
                        variant='p3'
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
          <Typography color='white' variant='p3' className='text-base'>
            &copy; SeTicket 2023
          </Typography>
        </div>
      </div>
    </footer>
  );
}
