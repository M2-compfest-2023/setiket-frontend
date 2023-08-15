import { BsJournalMedical } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

import { Navigation } from '@/types/navigate';

export const navigations: Navigation[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    exactMatch: true,
    icon: FaUsers,
  },
  {
    name: 'Event',
    href: '/dashboard/event',
    exactMatch: true,
    icon: MdOutlineEventAvailable,
    permissions: 'user',
    children: [
      {
        name: 'My Ticket',
        href: '/dashboard/event',
        className:
          'md:hover:bg-danger-30 text-typo-white hover:text-typo-primary',
        activeClassName: 'bg-danger-30 text-typo-white',
        icon: BsJournalMedical,
        permissions: 'user',
      },
    ],
  },
  {
    name: 'Admin',
    href: '/admin',
    exactMatch: true,
    icon: RiAdminFill,
    permissions: 'admin',
    children: [
      {
        name: 'User',
        href: '/admin/user',
        icon: BsJournalMedical,
        permissions: 'admin',
      },
    ],
  },
];
