import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

import Image from 'next/legacy/image';
import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Download from 'yet-another-react-lightbox/plugins/download';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

type CardPreview = {
  label?: string;
  width?: number;
  height?: number;
  imgSrc?: string;
  imgClassName?: string;
  alt: string;
} & React.ComponentPropsWithoutRef<'div'>;

const ImagePreview = ({
  imgSrc,
  label,
  alt,
  width = 300,
  height = 160,
  className,
  imgClassName,
  ...props
}: CardPreview) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <>
      <div {...props} className='cursor-pointer'>
        {imgSrc && (
          <div className={className}>
            <Image
              src={imgSrc as string}
              layout='responsive'
              width={width}
              height={height}
              alt={alt}
              objectFit='cover'
              className={imgClassName}
              onClick={() => setIsOpen(true)}
            />
          </div>
        )}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={[
              {
                src: imgSrc as string,
                alt: alt,
                title: `${label}`,
                description: '',
              },
            ]}
            plugins={[Captions, Zoom, Download]}
            animation={{ zoom: 500 }}
            captions={{
              descriptionTextAlign: 'start',
            }}
          />
        )}
      </div>
    </>
  );
};

export default ImagePreview;
