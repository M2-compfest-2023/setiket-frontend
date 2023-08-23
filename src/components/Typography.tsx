import * as React from 'react';

import clsxm from '@/lib/clsxm';

export enum TypographyVariant {
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p1',
  'p2',
  'p3',
  'p4',
  'b1',
  'b2',
  'b3',
  'c1',
  'c2',
  't',
  'bt',
  'btn',
  'p',
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
  'cyan',
  'violet',
}

enum FontVariant {
  'ubuntu',
  'inter',
  'pattaya',
  'lobster',
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
  variant = 'p1',
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
          font === 'lobster' && ['font-lobster leading-none'],
        ],
        // *=============== Font Variants ==================
        [
          variant === 'h1' && ['md:text-[64px] md:leading-[76px] font-bold'],
          variant === 'h2' && ['md:text-[48px] md:leading-[58px] font-bold'],
          variant === 'h3' && ['md:text-[32px] md:leading-[38px] font-bold'],
          variant === 'h4' && ['md:text-[24px] md:leading-[28px] font-bold'],
          variant === 'h5' && ['md:text-[20px] md:leading-[24px] font-bold'],
          variant === 'h6' && ['md:text-[16px] md:leading-[20px] font-bold'],
          variant === 'p1' && ['md:text-[24px] md:leading-[36px]'],
          variant === 'p2' && ['md:text-[16px] md:leading-[24px]'],
          variant === 'p3' && ['md:text-[12px] md:leading-[18px]'],
          variant === 'p4' && ['md:text-[9px] md:leading-[12px]'],
          variant === 'b1' && ['md:text-[24px] md:leading-[36px] font-bold'],
          variant === 'b2' && ['md:text-[16px] md:leading-[24px] font-bold'],
          variant === 'b3' && ['md:text-[12px] md:leading-[18px] font-bold'],
          variant === 'c1' && ['md:text-[14px] md:leading-[24px]'],
          variant === 'c2' && ['md:text-[12px] md:leading-[24px]'],
          variant === 't' && ['md:text-[20px] md:leading-[24px]'],
          variant === 'p' && ['md:text-[18px] md:leading-[24px]'],
          variant === 'bt' && ['md:text-[16px] md:leading-[24px]'],
          variant === 'btn' && ['md:text-[16px] md:leading-[24px]'],
        ],
        // *=============== Font Colors ==================
        [color === 'primary' && ['text-typo-primary']],
        [color === 'secondary' && ['text-typo-secondary']],
        [color === 'label' && ['text-typo-label']],
        [color === 'icon' && ['text-typo-icon']],
        [color === 'outline' && ['text-typo-outline']],
        [color === 'inline' && ['text-typo-inline']],
        [color === 'white' && ['text-white']],
        [color === 'surface' && ['text-typo-surface']],
        [color === 'success' && ['text-success-60']],
        [color === 'warning' && ['text-warning-60']],
        [color === 'danger' && ['text-danger-60']],
        [color === 'cyan' && ['text-cyan-800']],
        [color === 'violet' && ['text-background-violet']],
        [color === 'slate' && ['text-slate-800']],

        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
