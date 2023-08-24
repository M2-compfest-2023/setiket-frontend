import { BsBellFill } from 'react-icons/bs';

import TextLine from '@/components/TextLine';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

type Props = {
  className?: string;
};

export default function Notifications({ className }: Props) {
  return (
    <div
      className={clsxm(
        'flex flex-col justify-center md:px-10 md:py-5 w-full rounded-3xl bg-gradient-to-br from-gradient-500 to-gradient-600',
        className
      )}
    >
      <Typography
        variant='h4'
        font='ubuntu'
        color='white'
        className='flex items-center'
      >
        <BsBellFill className='inline- mr-3' /> Notifications
      </Typography>

      <hr className='h-px my-3 border-0 bg-white' />

      <div>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
        <TextLine className='my-2'>
          A new event: <b>Event Name</b> by <b>Username</b> submitted for review
        </TextLine>
      </div>
    </div>
  );
}
