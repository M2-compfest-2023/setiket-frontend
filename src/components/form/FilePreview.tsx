import 'yet-another-react-lightbox/styles.css';

import * as React from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { LuEye } from 'react-icons/lu';
import { TbFileText } from 'react-icons/tb';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import IconButton from '@/components/buttons/IconButton';
import IconLink from '@/components/links/IconLink';
import Typography from '@/components/Typography';
import { FileWithPreview } from '@/types/form/dropzone';

type FilePreviewProps = {
  file: FileWithPreview;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => void;
  readOnly?: boolean;
};

export default function FilePreview({
  file,
  deleteFile,
  readOnly,
}: FilePreviewProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const imageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  const zoomRef = React.useRef(null);

  return (
    <li
      key={file.name}
      className='w-full flex items-center gap-2 px-3 py-1 bg-base-white ring-1 ring-inset ring-typo-inline border-none rounded-md'
    >
      <div className='w-6 h-6'>
        <TbFileText className='w-full h-full text-typo-label' />
      </div>

      <Typography
        variant='c1'
        color='label'
        weight='medium'
        className='flex-1 text-sm truncate'
      >
        {file.name}
      </Typography>

      {imageTypes.includes(file.type) ? (
        <IconButton
          icon={LuEye}
          variant='none'
          onClick={() => setIsOpen(true)}
          iconClassName='text-typo-label'
        />
      ) : (
        <IconLink
          href={file.preview}
          variant='none'
          icon={HiOutlineExternalLink}
          size='sm'
          iconClassName='text-typo-primary'
        />
      )}

      {!readOnly && (
        <IconButton
          variant='none'
          icon={IoClose}
          onClick={handleDelete}
          iconClassName='text-danger-50'
        />
      )}

      <Lightbox
        open={isOpen}
        slides={[{ src: file.preview }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        plugins={[Zoom]}
        zoom={{ ref: zoomRef }}
        close={() => setIsOpen(false)}
      />
    </li>
  );
}
