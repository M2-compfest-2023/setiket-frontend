import { FormProvider, useForm } from 'react-hook-form';

import { BsFillPlusCircleFill } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

import Layout from '@/layouts/Layout';
import Input from '@/components/form/Input';
import IconCard from '@/components/cards/IconCard';

type SearchForm = {
  keyword: string;
};

export default function MyEvents() {
  // search bar
  const searchMethod = useForm<SearchForm>({
    mode: 'onTouched',
  });

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='min-h-screen'>
        <div className='flex justify-end px-10 py-5'>
          <FormProvider {...searchMethod}>
            <form action=''>
              <Input
                id='keyword'
                placeholder='search event name'
                leftIcon={BsSearch}
              />
            </form>
          </FormProvider>
        </div>

        <div className='px-4 sm:px-10 flex flex-col' id='events'>
          <IconCard
            Icon={BsFillPlusCircleFill}
            link='/myevents/add'
            className='hover:shadow-xl hover:scale-105 duration-150'
            text='Add event'
          />
        </div>
      </div>
    </Layout>
  );
}
