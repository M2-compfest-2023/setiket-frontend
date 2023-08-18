import { TbWorld } from 'react-icons/tb';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import PrimaryLink from '@/components/links/PrimaryLink';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';

export default function Home() {
  return (
    <Layout>
      <SEO title='Home' description='This is the home page' />
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <Typography variant='p' font='ubuntu'>
            Design System SeTicket 2023
          </Typography>
          <div className='flex justify-evenly'>
            <PrimaryLink
              href='/gsm/fonts'
              size='small'
              className='hover:opacity-50'
            >
              Fonts
            </PrimaryLink>
            <PrimaryLink
              href='/gsm/button'
              size='small'
              className='hover:opacity-50'
            >
              Buttons
            </PrimaryLink>
          </div>
          <div className=''>
            <Button variant='primary' size='sm'>
              Text Only
            </Button>
            <Button variant='primary' size='base'>
              Text Only
            </Button>
            <Button variant='primary' size='lg'>
              Text Only
            </Button>
          </div>
          <div className=''>
            <Button variant='danger' size='sm'>
              Text Only
            </Button>
            <Button variant='danger' size='base'>
              Text Only
            </Button>
            <Button variant='danger' size='lg'>
              Text Only
            </Button>
          </div>
          <div className=''>
            <Button variant='warning' size='sm'>
              Text Only
            </Button>
            <Button variant='warning' size='base'>
              Text Only
            </Button>
            <Button variant='warning' size='lg'>
              Text Only
            </Button>
          </div>
          <div className=''>
            <Button variant='success' size='sm'>
              Text Only
            </Button>
            <Button variant='success' size='base'>
              Text Only
            </Button>
            <Button variant='success' size='lg'>
              Text Only
            </Button>
          </div>
          <div className=''>
            <Button variant='label' size='sm'>
              Text Only
            </Button>
            <Button variant='label' size='base'>
              Text Only
            </Button>
            <Button variant='label' size='lg'>
              Text Only
            </Button>
          </div>
          <div className=''>
            <Button variant='primary' size='sm' rightIcon={TbWorld}>
              Text Icon
            </Button>
            <Button variant='primary' size='base' rightIcon={TbWorld}>
              Text Icon
            </Button>
            <Button variant='primary' size='lg' rightIcon={TbWorld}>
              Text Icon
            </Button>
          </div>
          <div className=''>
            <Button variant='danger' size='sm' leftIcon={TbWorld}>
              Text Icon
            </Button>
            <Button variant='danger' size='base' leftIcon={TbWorld}>
              Text Icon
            </Button>
            <Button variant='danger' size='lg' leftIcon={TbWorld}>
              Text Icon
            </Button>
          </div>
          <div>
            <IconButton variant='primary' size='sm' icon={TbWorld} />
            <IconButton variant='primary' size='base' icon={TbWorld} />
            <IconButton variant='primary' size='lg' icon={TbWorld} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
