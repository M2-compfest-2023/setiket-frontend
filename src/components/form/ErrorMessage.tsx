import Typography from '@/components/Typography';

export default function ErrorMessage({ children }: { children: string }) {
  return (
    <div className='flex space-x-1'>
      <Typography variant='c1' className='!leading-tight text-danger-50'>
        {children}
      </Typography>
    </div>
  );
}
