import { MdOutlineChangeCircle } from 'react-icons/md';

import ImagePreview from '@/components/Image/ImagePreview';
import ImagePreviewWithFetch from '@/components/Image/ImagePreviewWithFetch';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

type ImagePreviewCardProps = {
  imgPath: string;
  label?: string;
  caption: string;
  withFetch?: boolean;
  onDelete?: () => void;
  onDeleteLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ImagePreviewCard({
  imgPath,
  label = '',
  caption,
  withFetch = false,
  onDelete,
  onDeleteLoading,
}: ImagePreviewCardProps) {
  return (
    <div className='relative flex items-center gap-x-4 p-4 rounded-xl border border-typo-outline group'>
      {withFetch ? (
        <ImagePreviewWithFetch
          imgPath={imgPath}
          alt={label}
          label={label}
          width={80}
          height={80}
          className='w-20'
          imgClassName='rounded-md'
        />
      ) : (
        <ImagePreview
          imgSrc={imgPath}
          alt={label}
          label={label}
          width={80}
          height={80}
          className='w-20'
          imgClassName='rounded-md'
        />
      )}
      <div className='space-y-2'>
        <Typography variant='bt' className='font-semibold text-typo-primary'>
          {label}
        </Typography>
        <Typography variant='c1' className='text-typo-icon'>
          {caption}
        </Typography>
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          className='absolute top-2 right-2 text-typo-primary/70 group-hover:text-typo-primary'
          type='button'
        >
          <MdOutlineChangeCircle
            size={26}
            className={clsxm(onDeleteLoading && 'animate-spin')}
          />
        </button>
      )}
    </div>
  );
}
