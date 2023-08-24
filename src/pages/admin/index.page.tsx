// import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import Notifications from '@/layouts/dashboard/Notifications';
import UsersOverview from '@/layouts/dashboard/UserOverview';

// export default withAuth(DashboardAdminPage, 'admin');

export default function DashboardAdminPage() {
  return (
    <DashboardLayout>
      <Notifications className='mb-5  ' />
      <UsersOverview className='mb-5  ' />
    </DashboardLayout>
  );
}
