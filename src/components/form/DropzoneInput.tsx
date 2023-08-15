import * as React from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import ErrorMessage from '@/components/form/ErrorMessage';
import FilePreview from '@/components/form/FilePreview';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { FileWithPreview } from '@/types/form/dropzone';

export type DropzoneInputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  accept?: Accept;
  acceptTypes?: string;
  maxFiles?: number;
  className?: string;
};

export default function DropzoneInput({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  accept = { 'image/*': ['.jpg', '.jpeg', '.png'] },
  acceptTypes = 'JPG, JPEG, atau PNG',
  maxFiles = 1,
  className,
}: DropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  const dropzoneRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);

  const [files, setFiles] = React.useState<FileWithPreview[]>(
    getValues(id) || []
  );

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ?? [...files]);
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
        const acceptedFilesPreview = acceptedFiles.map((file: T) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          { shouldValidate: true }
        );

        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  );

  React.useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);

    setFiles(newFiles.length > 0 ? newFiles : []);
    setValue(id, newFiles.length > 0 ? newFiles : null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
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

      {files?.length < maxFiles && (
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
                  'border-dashed border-2 border-typo-inline',
                  error
                    ? 'border-red group-focus:border-red'
                    : 'group-focus:border-typo-primary group-hover:border-typo-primary',
                  className
                )}
              >
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
                  Tersisa {maxFiles - files?.length} file lagi
                </Typography>
              </div>
            </div>
          )}
        />
      )}

      <div className='divide-y divide-typo-label'>
        {files.map((file, index) => (
          <FilePreview key={index} file={file} deleteFile={deleteFile} />
        ))}
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
