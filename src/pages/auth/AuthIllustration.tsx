import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

export default function AuthIllustration(): JSX.Element {
  return (
    <section className='relative'>
      <div className='w-7/12 h-screen fixed left-0'>
        <div className='h-full relative w-full overflow-hidden flex items-center justify-center'>
          <div className='absolute w-1/2'>
            <Typography
              className='flex items-center justify-center'
              color='white'
              variant='h2'
              font='pattaya'
            >
              SeTiket
            </Typography>
            <Typography
              className='flex items-center justify-center mt-2'
              color='white'
            >
              Where Innovation Meets Event Excellence.
            </Typography>
            <NextImage
              src='/images/auth/person-with-moped.png'
              alt='head'
              width={221}
              height={222}
              className='w-full mt-8'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
