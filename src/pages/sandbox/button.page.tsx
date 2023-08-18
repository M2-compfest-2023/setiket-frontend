import * as React from 'react';
import { FaChrome } from 'react-icons/fa';
import { FiArrowRight, FiPlus } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';

export default function ButtonSandbox() {
  return (
    <Layout withNavbar={true} withFooter={true}>
      <section className='min-h-screen'>
        <Typography variant='h4' className='layout pt-10'>
          Button
        </Typography>
        <div className='layout py-10 flex flex-wrap justify-between'>
          <div className='space-y-3 h-fit'>
            <div className='space-x-3 p-2'>
              <Button variant='primary' size='lg'>
                Text Only
              </Button>
              <Button variant='primary' size='base'>
                Text Only
              </Button>
              <Button variant='primary' size='sm'>
                Text Only
              </Button>
            </div>
            <div className='space-x-3 p-2'>
              <Button variant='secondary' size='lg'>
                Text Only
              </Button>
              <Button variant='secondary' size='base'>
                Text Only
              </Button>
              <Button variant='secondary' size='sm'>
                Text Only
              </Button>
            </div>
            <div className='space-x-3 p-2'>
              <Button variant='gradient' size='lg'>
                Text Only
              </Button>
              <Button variant='gradient' size='base'>
                Text Only
              </Button>
              <Button variant='gradient' size='sm'>
                Text Only
              </Button>
            </div>
          </div>
        </div>

        <Typography variant='h4' className='layout text-black pt-10'>
          Icon Button
        </Typography>
        <div className='layout py-10 flex flex-wrap justify-between'>
          <div className='space-y-3 h-fit'>
            <div className='space-x-3'>
              <IconButton variant='primary' size='lg' icon={FaChrome} />
              <IconButton variant='primary' size='base' icon={FaChrome} />
              <IconButton variant='primary' size='sm' icon={FaChrome} />
            </div>
            <div className='space-x-3'>
              <IconButton variant='secondary' size='lg' icon={FaChrome} />
              <IconButton variant='secondary' size='base' icon={FaChrome} />
              <IconButton variant='secondary' size='sm' icon={FaChrome} />
            </div>
            <div className='space-x-3'>
              <IconButton variant='gradient' size='lg' icon={FaChrome} />
              <IconButton variant='gradient' size='base' icon={FaChrome} />
              <IconButton variant='gradient' size='sm' icon={FaChrome} />
            </div>
          </div>
        </div>

        <section id='outline-button'>
          <Typography variant='h4' className='layout text-black pt-10'>
            Outline Button
          </Typography>
          <div className='layout py-10 flex flex-wrap justify-between'>
            <div className='space-y-3 h-fit'>
              <div className='space-x-3 space-y-1'>
                <Button
                  variant='outline'
                  size='lg'
                  leftIcon={FiPlus}
                  rightIcon={FiArrowRight}
                >
                  Outline Button
                </Button>
                <Button
                  variant='outline'
                  size='base'
                  leftIcon={FiPlus}
                  rightIcon={FiArrowRight}
                >
                  Outline Button
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  leftIcon={FiPlus}
                  rightIcon={FiArrowRight}
                >
                  Outline Button
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id='basic-button'>
          <Typography variant='h4' className='layout text-black pt-10'>
            Basic Button
          </Typography>
          <div className='layout py-10 flex flex-wrap justify-between'>
            <div className='space-y-3 h-fit'>
              <div className='space-x-3 space-y-1'>
                <Button
                  variant='primary'
                  size='lg'
                  leftIcon={FiPlus}
                  rightIcon={FiArrowRight}
                >
                  Basic Button
                </Button>
                <Button
                  variant='primary'
                  size='base'
                  leftIcon={FiPlus}
                  rightIcon={FiArrowRight}
                >
                  Basic Button
                </Button>
                <Button
                  variant='primary'
                  size='sm'
                  leftIcon={FiPlus}
                  rightIcon={FiArrowRight}
                >
                  Basic Button
                </Button>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* <section id='outline-button' className=''>
      <div className='layout py-10'>
        <Typography variant='h4' className='layout text-white pt-10'>
          Outline Button
        </Typography>
      </div>
    </section> */}
    </Layout>
  );
}
