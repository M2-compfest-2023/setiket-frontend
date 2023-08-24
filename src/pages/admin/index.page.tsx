// import withAuth from '@/components/hoc/withAuth';
import { useState } from 'react';

import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import Notifications from '@/layouts/dashboard/Notifications';
import UsersOverview from '@/layouts/dashboard/UserOverview';

// export default withAuth(DashboardAdminPage, 'admin');

export default function DashboardAdminPage() {
  const [componentIndex, setComponentIndex] = useState(0);

  return (
    <DashboardLayout action={setComponentIndex}>
      {componentIndex == 0 ? (
        <Notifications className='mb-5  ' />
      ) : (
        <UsersOverview className='mb-5  ' />
      )}
    </DashboardLayout>
  );
}
