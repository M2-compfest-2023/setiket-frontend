import * as React from 'react';

import NextImage from '@/components/NextImage';
import clsxm from '@/lib/clsxm';

type LogoProps = { className?: string };

export default function Logo({ className }: LogoProps) {
  return (
    <NextImage
      className={clsxm('w-44 md:w-[34px]', className)}
      src='/images/logo.png'
      width='34'
      height='29.67'
      layout='responsive'
      objectFit='contain'
      alt='logo'
    />
  );
}
