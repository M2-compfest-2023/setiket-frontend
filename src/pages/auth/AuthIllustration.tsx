import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

type Props = React.ComponentPropsWithRef<'button'>;

export default function AuthIllustration({ className }: Props): JSX.Element {
  return (
    <section className='relative'>
      <div className={clsxm('fixed w-7/12 h-screen', className)}>
        <div className='h-full w-full overflow-hidden flex flex-col items-center justify-center p-10'>
          <Typography color='white' variant='h3' font='ubuntu'>
            SeTiket
          </Typography>
          <Typography color='white' weight='medium' variant='p1'>
            Where Innovation Meets Event Excellence.
          </Typography>
          <NextImage
            src='/images/auth/person-with-moped.png'
            alt='head'
            width={400}
            height={400}
            className='mt-4'
          />
        </div>
      </div>
    </section>
  );
}
