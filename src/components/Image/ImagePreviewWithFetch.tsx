import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

import Image from 'next/legacy/image';
import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Download from 'yet-another-react-lightbox/plugins/download';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import api from '@/lib/api';

type CardPreviewWithFetchProps = {
  imgPath: string;
  label?: string;
  width?: number;
  height?: number;
  imgClassName?: string;
  alt: string;
} & React.ComponentPropsWithoutRef<'div'>;

const CardPreviewWithFetch = ({
  imgPath,
  label,
  alt,
  width = 300,
  height = 160,
  className,
  imgClassName,
  ...props
}: CardPreviewWithFetchProps) => {
  const [imgSrc, setImgSrc] = React.useState<string>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const getImageURL = React.useCallback(async ({ url }: { url: string }) => {
    api
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const base64string = Buffer.from(
          new Uint8Array(res.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, ''),
          'binary'
        ).toString('base64');

        const contentType = res.headers['content-type'];
        return {
          data: `data:${contentType};base64,${base64string}`,
        };
      })
      .then((res) => {
        setImgSrc(res.data);
      });
  }, []);

  React.useEffect(() => {
    if (imgPath) {
      getImageURL({ url: `${imgPath}` });
    }
  }, [getImageURL, imgPath]);

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

export default CardPreviewWithFetch;
