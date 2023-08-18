import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BiCircle } from 'react-icons/bi';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/form/DropzoneInput';
import Input from '@/components/form/Input';
import SelectInput from '@/components/form/SelectInput';
import TextArea from '@/components/form/TextArea';
import Typography from '@/components/Typography';
import { FileWithPreview } from '@/types/form/dropzone';

type SandboxForm = {
  text: string;
  textWithHelper: string;
  textWithValidation: string;
  textWithPrefix: string;
  textWithSuffix: string;
  textWithPrefixSuffix: string;
  textWithLeftIcon: string;
  textWithRightIcon: string;
  textWithLeftRightIcon: string;
  textReadOnly: string;
  select: 'male' | 'female' | 'other';
  selectReadOnly: 'male' | 'female' | 'other';
  textarea: string;
  textareaReadOnly: string;
  dropzone: FileWithPreview;
};

export default function FormSandbox() {
  const methods = useForm<SandboxForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<SandboxForm> = (data) => {
    // !STARTERCONF Remove console log, use logger instead
    // eslint-disable-next-line no-console
    console.log(data);
    return;
  };

  return (
    <div className='p-6 space-y-4'>
      <Typography variant='h4' font='ubuntu'>
        Form
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm space-y-4'>
          <Input id='text' label='Text' placeholder='Placeholder' />
          <Input
            id='textWithHelper'
            label='Text With Helper'
            placeholder='Placeholder'
            helperText='This is helper text'
          />
          <Input
            id='textWithValidation'
            label='Text With Validation'
            placeholder='Placeholder'
            validation={{
              required: 'Field must be filled',
              minLength: {
                value: 3,
                message: 'Field must be at least 3 characters',
              },
            }}
          />
          <Input
            id='textWithPrefix'
            label='Text With Prefix'
            placeholder='Placeholder'
            prefix='Prefix'
          />
          <Input
            id='textWithSuffix'
            label='Text With Suffix'
            placeholder='Placeholder'
            suffix='Suffix'
          />
          <Input
            id='textWithPrefixSuffix'
            label='Text With Prefix Suffix'
            placeholder='Placeholder'
            prefix='Prefix'
            suffix='Suffix'
          />
          <Input
            id='textWithLeftIcon'
            label='Text With Left Icon'
            placeholder='Placeholder'
            leftIcon={BiCircle}
          />
          <Input
            id='textWithRightIcon'
            label='Text With Right Icon'
            placeholder='Placeholder'
            rightIcon={BiCircle}
          />
          <Input
            id='textWithLeftRightIcon'
            label='Text With Left Right Icon'
            placeholder='Placeholder'
            leftIcon={BiCircle}
            rightIcon={BiCircle}
          />
          <Input
            id='textReadOnly'
            label='Text Read Only'
            readOnly
            value='This is read only'
          />

          <SelectInput
            id='selectWithHelper'
            label='Select Input With Helper'
            placeholder='Placeholder'
            helperText='This is helper'
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </SelectInput>

          <SelectInput
            id='select'
            label='Select Input'
            placeholder='Placeholder'
            validation={{ required: 'This field is required' }}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </SelectInput>

          <SelectInput
            id='selectReadOnly'
            label='Select Input Read Only'
            readOnly
            defaultValue='male'
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </SelectInput>

          <TextArea
            id='textarea'
            label='Text Area'
            placeholder='Write long text here'
          />

          <TextArea
            id='textareaReadOnly'
            label='Text Area'
            readOnly
            rows={5}
            value='Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium illum sed, magnam consectetur temporibus veniam perferendis dolorem beatae adipisci omnis hic, eius alias non, necessitatibus excepturi aliquid praesentium corporis nisi pariatur eligendi. Provident dicta reprehenderit, aut asperiores consequuntur ab omnis.'
          />

          <DropzoneInput
            id='dropzone'
            label='File Dropzone'
            helperText='You can upload file with .jpg, .jpeg, .png, or .pdf extension.'
            acceptTypes='JPG, JPEG, PNG, atau PDF'
            accept={{
              'image/*': ['.jpg', '.jpeg', '.png'],
              'application/pdf': ['.pdf'],
            }}
          />

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
