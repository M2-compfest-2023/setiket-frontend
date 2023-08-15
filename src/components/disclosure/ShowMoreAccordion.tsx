import { Disclosure, Transition } from '@headlessui/react';
import * as React from 'react';
import { RxChevronDown } from 'react-icons/rx';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { ExtractProps } from '@/types/helper';

type ShowMoreAccordionProps = {
  openTitle: string;
  closedTitle: string;
  titleClassName?: string;
  className?: string;
} & ExtractProps<typeof Disclosure>;

export default function ShowMoreAccordion({
  openTitle,
  closedTitle,
  titleClassName,
  className,
  children,
  ...rest
}: ShowMoreAccordionProps) {
  return (
    <Disclosure as={React.Fragment} {...rest}>
      {({ open }) => (
        <div className={clsxm('space-y-4', className)}>
          <Transition
            className='transition-all duration-300 overflow-hidden'
            enterFrom='opacity-0 max-h-0'
            enterTo='opacity-100 max-h-[1080px]'
            leaveFrom='opacity-100 max-h-[1080px]'
            leaveTo='opacity-0 max-h-0'
          >
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </Transition>

          <Disclosure.Button
            className={clsxm(
              'w-full flex justify-center items-center bg-typo-surface fill-typo-secondary',
              titleClassName
            )}
          >
            <Typography variant='bt'>
              {open ? openTitle : closedTitle}
            </Typography>
            <div className='ml-1.5'>
              <RxChevronDown
                className={clsxm(
                  'w-4 h-4 fill-inherit transition-transform duration-200 ease-in-out',
                  open && 'rotate-180'
                )}
              />
            </div>
          </Disclosure.Button>
        </div>
      )}
    </Disclosure>
  );
}
