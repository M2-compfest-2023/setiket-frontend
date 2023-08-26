import get from 'lodash.get';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { FiChevronDown, FiX } from 'react-icons/fi';
import Select, { components, MultiValue, StylesConfig } from 'react-select';

import Typography from '@/components/Typography';

export type SearchableSelectInputProps = {
  label?: string | null;
  id: string;
  placeholder?: React.ReactNode;
  helperText?: string;
  type?: string;
  isMulti?: boolean;
  readOnly?: boolean;
  validation?: RegisterOptions;
  options: { value: string; label: string }[];
  containerClassName?: string;
  labelClassName?: string;
  reactSelectProps?: React.ComponentPropsWithoutRef<typeof Select>;
  handleChange?: <T extends string>(selectedOptions: T) => void;
} & React.ComponentPropsWithoutRef<'select'>;

export default function SearchableSelectInput({
  disabled,
  label,
  helperText,
  id,
  isMulti = false,
  placeholder,
  validation,
  options,
  containerClassName,
  reactSelectProps,
  handleChange,
  labelClassName,
}: SearchableSelectInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  return (
    <div className={containerClassName}>
      {label && (
        <Typography
          font='inter'
          variant='p3'
          weight='semibold'
          className={labelClassName}
        >
          {label}
        </Typography>
      )}
      <div className='relative mt-1'>
        <Controller
          name={id}
          control={control}
          rules={validation}
          render={({ field }) => {
            const styles = error ? errorStyles : customStyles;
            return (
              <Select
                {...field}
                value={
                  //? null is needed so if the selected value is not found in the options, it will clear the value
                  isMulti
                    ? field.value?.map(
                        (value: unknown) =>
                          options.find((option) => option.value === value) ??
                          null
                      )
                    : options.find((opt) => opt.value === field.value) ?? null
                }
                onChange={(selectedOptions) => {
                  isMulti
                    ? field.onChange(
                        (
                          selectedOptions as MultiValue<
                            (typeof options)[number]
                          >
                        ).map((option) => option?.value ?? '')
                      )
                    : field.onChange(
                        (selectedOptions as (typeof options)[number])?.value ??
                          ''
                      );
                  handleChange?.(selectedOptions?.value);
                }}
                isDisabled={disabled}
                isClearable
                isMulti={isMulti}
                closeMenuOnSelect={!isMulti}
                placeholder={placeholder}
                options={options}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <FiChevronDown className='text-xl' />
                    </components.DropdownIndicator>
                  ),
                  ClearIndicator: (props) => (
                    <components.ClearIndicator {...props}>
                      <FiX className='mr-0.5 text-lg text-typo-icons hover:text-typo-secondary' />
                    </components.ClearIndicator>
                  ),
                  MultiValueRemove: (props) => (
                    <components.MultiValueRemove {...props}>
                      <FiX size={16} />
                    </components.MultiValueRemove>
                  ),
                }}
                {...reactSelectProps}
              />
            );
          }}
        />
        <div className='mt-1'>
          {helperText && (
            <Typography variant='c1' color='secondary'>
              {helperText}
            </Typography>
          )}
          {error && (
            <Typography variant='c1' color='danger'>
              {error?.message?.toString()}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

const customStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: '1px solid #e5e7eb',
    boxShadow: 'none',
    transition: 'none',
    '&:focus-within': {
      border: '1px solid #9aa2b1',
    },
    '&:hover': {
      border: '1px solid #9aa2b1',
    },
    '*': {
      boxShadow: 'none !important',
    },
    borderRadius: '0.5rem',
    background: '#eeeee',
    padding: '0.5rem 0.75rem',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
    gap: '0.5rem',
  }),
  input: (styles) => ({
    ...styles,
    padding: 0,
    margin: 0,
    caretColor: '#6ac0f5',
    color: '#1F201d',
    '::placeholder': {
      color: '#5a5d56',
    },
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    '&>div': {
      padding: 0,
    },
  }),

  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#878787',
    '&:hover': {
      color: '#878787',
    },
  }),
  option: (styles, state) => ({
    ...styles,
    color: 'black',
    background: state.isSelected ? '#daeffc' : 'white',
    ':hover': {
      background: '#E5E7EB',
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    background: '#daeffc',
    borderRadius: '0.375rem',
    padding: '0.25rem 0.75rem',
    margin: 0,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#296a91',
    padding: 0,
    paddingLeft: 0,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#296a91',
    padding: 0,
    paddingLeft: '0.5rem',
    '&:hover': {
      color: '#296a91',
      backgroundColor: 'transparent',
    },
  }),
};

const errorStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: '1px solid red',
    boxShadow: 'none',
    '&:focus': {
      border: '1px solid red',
    },
    '&:hover': {
      border: '1px solid red',
    },
    '*': {
      boxShadow: 'none !important',
    },
    borderRadius: '0.5rem',
    background: '#FEF1F1',
    padding: '0.5rem 0.75rem',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  input: (styles) => ({
    ...styles,
    padding: 0,
    margin: 0,
    caretColor: '#6ac0f5',
    color: '#1F201d',
    '::placeholder': {
      color: '#5a5d56',
    },
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    '&>div': {
      padding: 0,
    },
  }),

  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#878787',
    '&:hover': {
      color: '#878787',
    },
  }),
  option: (styles, state) => ({
    ...styles,
    color: 'black',
    background: state.isSelected ? '#D1D5DB' : 'white',
    ':hover': {
      background: '#E5E7EB',
    },
  }),
};
