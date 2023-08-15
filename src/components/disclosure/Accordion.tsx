import { Disclosure, Transition } from '@headlessui/react';
import * as React from 'react';
import { RxChevronDown } from 'react-icons/rx';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { ExtractProps } from '@/types/helper';

type AccordionProps = {
  title: string;
  className?: string;
} & ExtractProps<typeof Disclosure>;

export default function Accordion({
  title,
  className,
  children,
  ...rest
}: AccordionProps) {
  return (
    <Disclosure as={React.Fragment} {...rest}>
      {({ open }) => (
        <div
          className={clsxm(
            'p-4 py-3 space-y-2 rounded-lg bg-typo-surface text-typo-primary',
            className
          )}
        >
          <Disclosure.Button className='w-full flex justify-between items-center'>
            <Typography variant='bt' className='text-left'>
              {title}
            </Typography>
            <div className='ml-1.5'>
              <RxChevronDown
                className={clsxm(
                  'w-4 h-4 text-typo-secondary transition-transform duration-200 ease-in-out',
                  open && 'rotate-180'
                )}
              />
            </div>
          </Disclosure.Button>

          <Transition
            className='transition-all duration-300 overflow-y-auto overflow-x-hidden'
            enterFrom='opacity-0 max-h-0'
            enterTo='opacity-100 max-h-96'
            leaveFrom='opacity-100 max-h-96'
            leaveTo='opacity-0 max-h-0'
          >
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}
