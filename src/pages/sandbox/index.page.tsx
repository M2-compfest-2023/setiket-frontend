import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/Typography';

const pages = [
  {
    title: 'Sandbox',
    href: '/sandbox',
  },
  {
    title: 'Login',
    href: '/login',
  },
  {
    title: 'Register',
    href: '/register',
  },
  {
    title: 'Coming Soon',
    href: '/coming-soon',
  },
];

const components = [
  {
    title: 'Button',
    href: '/sandbox/button',
  },
  {
    title: 'Toast',
    href: '/sandbox/toast',
  },
  {
    title: 'Button Link',
    href: '/sandbox/button-link',
  },
  {
    title: 'Form',
    href: '/sandbox/form',
  },
  {
    title: 'Badge',
    href: '/sandbox/badge',
  },
  {
    title: 'Countdown',
    href: '/sandbox/countdown',
  },
];

export default function SandboxPage() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='text-center flex flex-col justify-center items-center'>
        <Typography variant='h4' as='h4' font='ubuntu'>
          Design System
        </Typography>
        <Typography variant='h4' as='h4' font='ubuntu'>
          SeTicket
        </Typography>
        <Typography className='max-w-4xl'>
          Digunakan untuk membangun aplikasi yang konsisten dan mudah di
          maintain oleh developer selain itu sebagai Key Perform Indikator IT
          Dev SeTicket
        </Typography>
      </div>
      <div className='text-center'>
        <Typography variant='h5' className='font-bold'>
          Pages
        </Typography>
        <div className='flex flex-grow gap-2'>
          {pages.map((page) => (
            <ButtonLink
              key={page.title}
              href={page.href}
              className='mt-2'
              variant='success'
            >
              {page.title}
            </ButtonLink>
          ))}
        </div>
      </div>
      <div className='text-center mt-5'>
        <Typography variant='h5' className='font-bold'>
          Components
        </Typography>
        <div className='flex flex-grow gap-2'>
          {components.map((page) => (
            <ButtonLink
              key={page.title}
              href={page.href}
              className='mt-2'
              variant='warning'
            >
              {page.title}
            </ButtonLink>
          ))}
        </div>
      </div>
    </div>
  );
}
