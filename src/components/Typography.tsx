import * as React from 'react';

import clsxm from '@/lib/clsxm';

enum TypographyVariant {
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  't',
  'p',
  'bt',
  'btn',
  'c1',
  'c2',
}

export enum TypographyColor {
  'primary',
  'label',
  'secondary',
  'white',
  'danger',
  'success',
  'warning',
  'icon',
  'outline',
  'inline',
  'surface',
  'purple',
  'skyblue',
  'slate',
}

enum FontVariant {
  'ubuntu',
  'inter',
  'pattaya',
}

enum FontWeight {
  'regular',
  'medium',
  'semibold',
  'bold',
}

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  weight?: keyof typeof FontWeight;
  color?: keyof typeof TypographyColor;
  font?: keyof typeof FontVariant;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType>({
  as,
  children,
  weight = 'regular',
  className,
  color = 'primary',
  font = 'inter',
  variant = 'p',
  ...props
}: TypographyProps<T> &
  Omit<React.ComponentProps<T>, keyof TypographyProps<T>>) {
  const Component = as || 'p';
  return (
    <Component
      className={clsxm(
        // *=============== Font Type ==================
        [
          font === 'inter' && [
            'font-primary',
            [
              weight === 'regular' && 'font-normal',
              weight === 'medium' && 'font-medium',
              weight === 'semibold' && 'font-semibold',
              weight === 'bold' && 'font-bold',
            ],
          ],
          font === 'ubuntu' && ['font-secondary leading-none'],
          font === 'pattaya' && ['font-tertiary leading-none'],
        ],
        // *=============== Font Variants ==================
        [
          variant === 'h1' && ['md:text-[80px] md:leading-[96px]'],
          variant === 'h2' && ['md:text-[72px] md:leading-[90px]'],
          variant === 'h3' && ['md:text-[64px] md:leading-[84px]'],
          variant === 'h4' && ['md:text-[48px] md:leading-[64px]'],
          variant === 'h5' && ['md:text-[32px] md:leading-[48px]'],
          variant === 'h6' && ['md:text-[24px] md:leading-[32px]'],
          variant === 't' && ['md:text-[20px] md:leading-[24px]'],
          variant === 'p' && ['md:text-[18px] md:leading-[24px]'],
          variant === 'bt' && ['md:text-[16px] md:leading-[24px]'],
          variant === 'btn' && ['md:text-[16px] md:leading-[24px]'],
          variant === 'c1' && ['md:text-[14px] md:leading-[24px]'],
          variant === 'c2' && ['md:text-[12px] md:leading-[24px]'],
        ],
        // *=============== Font Colors ==================
        [color === 'primary' && ['text-typo-primary']],
        [color === 'secondary' && ['text-typo-secondary']],
        [color === 'label' && ['text-typo-label']],
        [color === 'icon' && ['text-typo-icon']],
        [color === 'outline' && ['text-typo-outline']],
        [color === 'inline' && ['text-typo-inline']],
        [color === 'white' && ['text-typo-white']],
        [color === 'surface' && ['text-typo-surface']],
        [color === 'success' && ['text-success-60']],
        [color === 'warning' && ['text-warning-60']],
        [color === 'danger' && ['text-danger-60']],
        [color === 'slate' && ['text-slate-800']],

        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
