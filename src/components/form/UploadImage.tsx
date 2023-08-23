import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import * as React from 'react';
import { useCallback } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import ImagePreviewCard from '@/components/Image/ImagePreviewCard';
import Typography from '@/components/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import clsxm from '@/lib/clsxm';
import { ApiReturn } from '@/types/api';

type DropzoneStoreInputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  accept?: Accept;
  validation?: RegisterOptions;
  className?: string;
  acceptTypes?: string;
  location?: string;
  fileName?: string;
};

export default function DropzoneStoreInput({
  id,
  label,
  accept,
  className,
  location,
  // Digunakan untuk mengganti nama file yang diupload ke server
  helperText,
  acceptTypes = 'JPG, JPEG, atau PNG',
  hideError = false,
  validation,
}: DropzoneStoreInputProps) {
  const methods = useFormContext();
  const {
    control,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = methods;

  const error = get(errors, id);

  const dropzoneRef = React.useRef<HTMLDivElement>(null);

  // const user = useAuthStore.useUser();

  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);

  const url = 'https://sch.sgp1.cdn.digitaloceanspaces.com/';

  const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string>(
    getValues(id) || ''
  );

  const { mutate: handleUploadFile, isLoading } = useMutationToast<
    void,
    FormData
  >(
    useMutation(async (data) => {
      await axios
        .post<ApiReturn<{ url: string }>>('/api/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          const data = res.data.data;
          setUploadedImageUrl(url + data.url);
          setValue(id, url + data.url, {
            shouldValidate: true,
          });
          clearErrors(id);
          return res;
        });
    })
  );

  const { mutate: hanldeDeleteFile, isLoading: onDeleteLoading } =
    useMutationToast<void, string>(
      useMutation(async (data) => {
        await axios
          .delete<ApiReturn<void>>(`/api/upload?key=${data}`)
          .then((res) => {
            return res;
          });
      })
    );

  const onDrop = useCallback(
    async <T extends File>(
      acceptedFiles: T[],
      rejectedFiles: FileRejection[]
    ) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, uploadedImageUrl ? uploadedImageUrl : '');
        setError(id, {
          type: 'manual',
          message:
            rejectedFiles &&
            `${
              rejectedFiles[0].errors[0].code === 'file-too-large'
                ? 'File tidak boleh lebih dari 1MB'
                : rejectedFiles[0].errors[0].code === 'file-invalid-type'
                ? 'Tipe file tidak didukung'
                : rejectedFiles[0].errors[0].message
            }`,
        });
      } else {
        const formdata = new FormData();
        formdata.append('file', acceptedFiles[0]);
        formdata.append('name', id);
        // formdata.append('email', user ? user.email : '');
        formdata.append('location', location ? location : '');

        handleUploadFile(formdata);
      }
    },

    [setValue, id, uploadedImageUrl, setError, location, handleUploadFile]
  );

  const onDelete = () => {
    // Remove url from uploadedImageURL

    const _key = uploadedImageUrl.split(url).pop();
    if (!_key) return;
    hanldeDeleteFile(_key, {
      onSuccess: () => {
        setUploadedImageUrl('');
        setValue(id, '');
      },
      onError: () => {
        setUploadedImageUrl(getValues(id));
      },
    });
  };

  React.useEffect(() => {
    const value = getValues(id);
    if (value) {
      setUploadedImageUrl(value);
    }
  }, [getValues, id]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: 1000000,
  });

  return (
    <div className='w-full space-y-1.5 rounded-md'>
      {label && (
        <label htmlFor={id} className='flex space-x-1'>
          <Typography
            font='inter'
            variant='c1'
            weight='semibold'
            className='text-sm text-typo-primary'
          >
            {label}
          </Typography>
          {validation?.required && (
            <Typography className='text-danger-50'>*</Typography>
          )}
        </label>
      )}
      {!uploadedImageUrl ? (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={() => (
            <div
              ref={dropzoneRef}
              className='focus:outline-none group'
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              <div
                className={clsxm(
                  'w-full cursor-pointer bg-base-white rounded-md',
                  'flex flex-col items-center space-y-2 px-3 py-8',
                  'border-dashed border-2 border-typo-inline ',
                  'relative',
                  error
                    ? 'border-danger-40 group-focus:border-danger-50'
                    : 'group-focus:border-typo-primary group-hover:border-typo-primary',
                  className
                )}
              >
                {isLoading ? (
                  <div
                    role='status'
                    className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 bg-gra'
                  >
                    <svg
                      aria-hidden='true'
                      className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                    <span className='sr-only'>Loading...</span>
                  </div>
                ) : (
                  <>
                    <div className='w-8 h-8 text-typo-label'>
                      <MdOutlineAddPhotoAlternate className='w-full h-full' />
                    </div>

                    <div className='flex flex-col items-center'>
                      <Typography
                        variant='c1'
                        className='text-center text-typo-icon text-sm'
                      >
                        <span className='font-semibold underline text-typo-primary'>
                          Klik untuk upload
                        </span>{' '}
                        atau drag and drop
                      </Typography>
                      <Typography
                        variant='c1'
                        className='text-center text-typo-icon text-sm'
                      >
                        {acceptTypes}
                      </Typography>
                    </div>

                    <Typography
                      variant='c2'
                      className='text-center text-typo-primary text-xs'
                    >
                      Tersisa 1 file lagi
                    </Typography>
                  </>
                )}
              </div>
            </div>
          )}
        />
      ) : (
        <ImagePreviewCard
          imgPath={uploadedImageUrl}
          label={label}
          caption='Pastikan foto yang diupload jelas dan tidak buram'
          onDelete={onDelete}
          onDeleteLoading={onDeleteLoading}
        />
      )}
      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
