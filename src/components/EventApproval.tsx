import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import Typography from '@/components/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import Modal from '@/layouts/Modal';
import api from '@/lib/api';

type Props = {
  isVisible: boolean;
  eventId: string;
  toggleVisibility: () => void;
};

export default function EventApproval({
  isVisible,
  eventId,
  toggleVisibility,
}: Props) {
  const router = useRouter();

  const methods = useForm<{
    verified: true;
  }>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const { mutate: handleVerified, isLoading } = useMutationToast<
    void,
    {
      verified: true;
    }
  >(
    useMutation(async (data) => {
      await api.put(`/events/approval/${eventId}`, data);

      showToast('Berhasil Mengubah Status Event', SUCCESS_TOAST);
      router.reload();
    })
  );

  const onSubmit = () => {
    handleVerified({ verified: true });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='relative z-[110]'>
          {isVisible && (
            <Modal className='flex flex-col'>
              <div className='md:w-[30%] bg-white rounded-xl px-8 py-5'>
                <Typography
                  className='h5 text-center'
                  font='ubuntu'
                  color='cyan'
                >
                  Event Approval
                </Typography>
                <div className='flex justify-around mt-5'>
                  <Button variant='danger' onClick={toggleVisibility}>
                    Cancel
                  </Button>
                  <Button type='submit' isLoading={isLoading}>
                    Approve
                  </Button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
