import { Popover, Transition } from '@headlessui/react';
import * as React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { FiChevronDown, FiFilter, FiX } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Checkbox from '@/components/form/Checkbox';
import { statusPembayaran } from '@/components/tag/PaymentTag';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

type PembayaranFilterPopupProps = {
  setPembayaranFilter: React.Dispatch<React.SetStateAction<string>>;
};

const pembayaran = Object.keys(statusPembayaran)
  .filter((key) => key !== 'DEFAULT')
  .map((key) => ({
    key: key,
    label: statusPembayaran[key].text,
    color: statusPembayaran[key].color,
    value: statusPembayaran[key].id,
  }));

export default function PembayaranFilterPopup({
  setPembayaranFilter,
}: PembayaranFilterPopupProps) {
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { control, setValue } = methods;

  const filter = useWatch({
    control,
    name: 'filter',
  });
  //#endregion  //*======== Form ===========

  React.useEffect(() => {
    setPembayaranFilter(filter);
  }, [filter, setPembayaranFilter]);

  const resetFilter = () => {
    setValue('filter', '');
  };
  return (
    <Popover className='relative'>
      {({ close }) => (
        <>
          <Popover.Button as='div'>
            <Button
              variant='outline'
              size='sm'
              leftIcon={FiFilter}
              rightIcon={FiChevronDown}
              className={clsxm(
                '!py-2.5 !bg-white',
                'border-typo-outline !text-typo-icon'
              )}
            >
              Filter
            </Button>
          </Popover.Button>

          <Transition
            as={React.Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-0 z-10 mt-3 w-screen max-w-xs transform sm:left-1/2 sm:-translate-x-1/2'>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative bg-white p-4'>
                  <FormProvider {...methods}>
                    <div className='flex items-center justify-between'>
                      <Typography variant='p' className='font-semibold'>
                        Filter by
                      </Typography>
                      <div className='flex items-center gap-3'>
                        <Typography
                          as='button'
                          variant='btn'
                          onClick={resetFilter}
                          className='cursor-pointer font-semibold text-primary-500 underline'
                        >
                          Reset Filter
                        </Typography>
                        <IconButton
                          variant='danger'
                          icon={FiX}
                          onClick={close}
                          size='sm'
                        />
                      </div>
                    </div>

                    <div className='mt-2 space-y-2'>
                      <Typography
                        variant='btn'
                        className='text-left font-medium'
                      >
                        Status Pembayaran
                      </Typography>
                      {pembayaran.map(({ key, value, label, color }) => (
                        <Checkbox
                          key={value}
                          name='filter'
                          value={key}
                          label={label}
                          color={color}
                          className='my-1'
                        />
                      ))}
                    </div>
                  </FormProvider>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
