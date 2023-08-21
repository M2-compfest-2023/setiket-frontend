import Link from 'next/link';
import clsxm from '@/lib/clsxm';
import Typography from '@/components/Typography';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IconType } from 'react-icons';

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
  Icon?: IconType;
  className?: string;
  link?: string
};

export default function IconCard({
  size,
  variant,
  className,
  Icon = BsFillPlusCircleFill,
  link = '/',
}: CardProps) {
  return (
    <Link href={link}>
      <div className={clsxm('w-[310px] h-[160px] bg-white hover:bg-gradient-to-r group from-gradient-100 to-gradient-200 rounded-3xl px-5 py-3 shadow-lg flex flex-col place-items-center justify-center gap-3 transition duration-500 ease-in-out',
      className)}>
        <Icon className='text-[42px] text-background-violet group-hover:text-white'/>
        <Typography
          className='text-cyan-700 group-hover:text-white'
          variant='b2'
        >
          See more
        </Typography>
      </div>
    </Link>
  );
}