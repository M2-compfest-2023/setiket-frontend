import { ReactNode } from 'react';

import clsxm from '@/lib/clsxm';

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function Modal({ children, className }: Props) {
  return (
    <div
      className={clsxm(
        'flex flex-col justify-center items-center min-h-screen fixed inset-0 bg-black/30 p-20',
        className
      )}
    >
      {children}
    </div>
  );
}
