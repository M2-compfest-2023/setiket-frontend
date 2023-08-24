import Table from '@/components/table/Table';
import Layout from '@/layouts/Layout';

// temporary page for slicing design
export default function Temp() {
  return (
    <Layout withNavbar withFooter>
      <div className='min-h-screen'>
        <Table data={[]} columns={[]} />
      </div>
    </Layout>
  );
}
