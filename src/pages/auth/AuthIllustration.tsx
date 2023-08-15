import NextImage from '@/components/NextImage';

export default function AuthIllustration(): JSX.Element {
  return (
    <section className='relative'>
      <div className='w-7/12 border-4 border-black h-screen fixed left-0'>
        <div className='bg-danger-10 h-1/4 border-black border-b-4 relative w-full overflow-hidden'>
          <div className='absolute left-0 top-0 w-1/4 lg:w-1/5'>
            <NextImage
              src='/images/login-register/npc-1.png'
              alt='head'
              width={221}
              height={222}
              className='w-full'
            />
          </div>
          <div className='absolute bottom-0 left-1/4 w-2/5 lg:w-1/3'>
            <NextImage
              src='/images/login-register/npc-2.png'
              alt='download'
              width={297}
              height={140}
              className='w-full'
            />
          </div>
          <div className='absolute left-1/3 lg:left-1/2 w-1/3 lg:w-1/4'>
            <NextImage
              src='/images/login-register/npc-3.png'
              alt='usb'
              width={192}
              height={82}
              className='w-full'
            />
          </div>
          <div className='absolute bottom-0 left-2/3 w-[15%] lg:w-[10%]'>
            <NextImage
              src='/images/login-register/npc-4.png'
              alt='hand'
              width={134}
              height={115}
              className='w-full'
            />
          </div>
          <div className='absolute right-0 w-1/5 lg:w-1/6 top-[15%]'>
            <NextImage
              src='/images/login-register/npc-5.png'
              alt='internet'
              width={168}
              height={190}
              className='w-full'
            />
          </div>
        </div>
        <div className='bg-warning-10 h-1/4 border-black border-b-4 relative w-full overflow-hidden'>
          <div className='absolute w-2/3 lg:w-1/2 xl:w-2/5 left-0'>
            <NextImage
              src='/images/login-register/nlc-1.png'
              alt='math'
              width={455}
              height={256}
              className='w-full h-full'
            />
          </div>
          <div className='absolute w-1/2 left-1/3 lg:left-1/4 bottom-0'>
            <NextImage
              src='/images/login-register/nlc-2.png'
              alt='abacus'
              width={518}
              height={256}
              className='w-full'
            />
          </div>
          <div className='absolute w-1/2 lg:w-2/5 right-0'>
            <NextImage
              src='/images/login-register/nlc-3.png'
              alt='math'
              width={381}
              height={256}
              className='w-full'
            />
          </div>
        </div>
        <div className='bg-success-10 h-1/4 border-black border-b-4 relative w-full overflow-hidden'>
          <div className='absolute w-1/4 lg:w-1/5'>
            <NextImage
              src='/images/login-register/bst-1.png'
              alt='notes'
              width={185}
              height={166}
              className='w-full'
            />
          </div>
          <div className='absolute bottom-0 left-1/4 w-2/5 xl:w-1/3'>
            <NextImage
              src='/images/login-register/bst-2.png'
              alt='laptop'
              width={364}
              height={211}
              className='w-full'
            />
          </div>
          <div className='absolute left-1/2 lg:left-[55%] w-1/4 lg:w-1/5'>
            <NextImage
              src='/images/login-register/bst-3.png'
              alt='hat'
              width={205}
              height={150}
              className='w-full'
            />
          </div>
          <div className='absolute bottom-0 right-0 w-1/3 lg:w-1/4'>
            <NextImage
              src='/images/login-register/bst-4.png'
              alt='projector'
              width={253}
              height={172}
              className='w-full'
            />
          </div>
        </div>
        <div className='bg-primary-10 h-1/4 relative w-full overflow-hidden'>
          <div className='absolute bottom-0 left-0 z-20 w-1/4 lg:w-[23%] xl:w-1/5'>
            <NextImage
              src='/images/login-register/reeva-1.png'
              alt='speaker'
              width={200}
              height={200}
              className='w-full'
            />
          </div>
          <div className='absolute -left-[10%] lg:left-[11%] xl:left-[9%] z-10 w-full lg:w-4/5 xl:w-3/4'>
            <NextImage
              src='/images/login-register/reeva-2.png'
              alt='musical notes'
              width={750}
              height={200}
              className='w-full'
            />
          </div>
          <div className='absolute bottom-0 left-[40%] lg:left-1/2 w-[20%] lg:w-[15%]'>
            <NextImage
              src='/images/login-register/reeva-3.png'
              alt='headphone'
              width={150}
              height={150}
              className='w-full'
            />
          </div>
          <div className='absolute right-[22%] w-[13%] lg:w-[10%]'>
            <NextImage
              src='/images/login-register/reeva-4.png'
              alt='mp3'
              width={100}
              height={100}
              className='w-full'
            />
          </div>
          <div className='absolute bottom-0 right-0 w-1/4 lg:w-1/5 xl:w-1/6'>
            <NextImage
              src='/images/login-register/reeva-5.png'
              alt='disc'
              width={200}
              height={175}
              className='w-full'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
