import Link from 'next/link';
import clsxm from '@/lib/clsxm';
import Typography from '@/components/Typography';
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineClockCircle, AiOutlineCalendar } from 'react-icons/ai';

enum CardVariant {
  'primary',
  'secondary',
  'gradient',
}

enum CardSize {
  'sm',
  'base',
  'lg',
}

type CardProps = {
  size?: keyof typeof CardSize;
  variant?: keyof typeof CardVariant;
  className?: string;
};

export default function EventCard({
  size,
  variant,
  className,
}: CardProps) {
  return (
    <Link href='/'>
      <div className={clsxm('w-[310px] h-[160px] bg-white rounded-3xl px-5 py-3 shadow-lg flex flex-col justify-between', className)}>
        <div>
          <Typography
            className='text-cyan-600 my-1'
            variant='p3'
            weight='semibold'
          >
            <HiLocationMarker className='inline-block'/> City, Province
          </Typography>

          <Typography
            variant='h5'
            color='cyan'
            className='my-1'
          >
            Event Name
          </Typography>

          <Typography
            className='text-cyan-700 my-1'
            variant='p3'
            weight='semibold'
          >
            <AiOutlineCalendar className='inline-block'/> dd/mm/yyyy
          </Typography>

          <Typography
            className='text-cyan-700 my-1'
            variant='p3'
            weight='semibold'
          >
            <AiOutlineClockCircle className='inline-block'/> 00:00 - 24:00
          </Typography>
        </div>

        <Typography
          className='text-cyan-700'
          variant='b2'
        >
          Rp 999,999
        </Typography>
      </div>
    </Link>
  );
}