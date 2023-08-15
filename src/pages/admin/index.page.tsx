import withAuth from '@/components/hoc/withAuth';
import Typography from '@/components/Typography';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import MascotCard from '@/pages/dashboard/home/components/MascotCard';

export default withAuth(DashboardAdminPage, 'admin');

function DashboardAdminPage() {
  return (
    <DashboardLayout>
      <Typography variant='bt' className='text-typo-icon' weight='medium'>
        SeTicket 2023
      </Typography>
      <Typography variant='h5' weight='bold'>
        Dashboard
      </Typography>
      <section className='grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-8'>
        <MascotCard
          event='NPC'
          link='/admin/npc'
          src='/images/dashboard/index/NPC Mascot.svg'
          className='hover:border-2 hover:border-danger-70 hover:bg-danger-10 hover:scale-[1.02] mx-auto'
          textClassName='text-danger-50 md:text-black group-hover:text-danger-50'
        ></MascotCard>
        <MascotCard
          event='NLC'
          link='/admin/nlc'
          src='/images/dashboard/index/NLC Mascot.svg'
          className='hover:border-2 hover:border-warning-70 hover:bg-warning-10 hover:scale-[1.02] mx-auto'
          textClassName='text-warning-50 md:text-black group-hover:text-warning-50'
        ></MascotCard>
        <MascotCard
          event='BST'
          link='/admin/bst'
          src='/images/dashboard/index/BST Mascot.svg'
          className='hover:border-2 hover:border-success-70 hover:bg-success-10 hover:scale-[1.02] mx-auto'
          textClassName='text-success-50 md:text-black group-hover:text-success-50'
        ></MascotCard>
        <MascotCard
          event='Reeva'
          link='/coming-soon'
          src='/images/dashboard/index/Reeva Mascot.svg'
          className='hover:border-2 hover:border-primary-70 hover:bg-primary-10 hover:scale-[1.02] mx-auto'
          textClassName='text-primary-50 md:text-black group-hover:text-primary-50'
        ></MascotCard>
      </section>
    </DashboardLayout>
  );
}
