import { BsBellFill, BsPeopleFill } from 'react-icons/bs';
import { MdOutlineEventNote } from 'react-icons/md';

import { Navigation } from '@/types/navigate';

export const navigations: Navigation[] = [
  {
    name: 'Notifications',
    href: '/admin/notifications',
    exactMatch: true,
    icon: BsBellFill,
  },
  {
    name: 'Users Overview',
    href: '/admin/users',
    exactMatch: true,
    icon: BsPeopleFill,
  },
  {
    name: 'Events Overview',
    href: '/admin/events  ',
    exactMatch: true,
    icon: MdOutlineEventNote,
  },
  // {
  //   name: 'Event',
  //   href: '/dashboard/event',
  //   exactMatch: true,
  //   icon: MdOutlineEventAvailable,
  //   permissions: 'user',
  //   children: [
  //     {
  //       name: 'My Ticket',
  //       href: '/dashboard/event',
  //       className:
  //         'md:hover:bg-danger-30 text-typo-white hover:text-typo-primary',
  //       activeClassName: 'bg-danger-30 text-typo-white',
  //       icon: BsJournalMedical,
  //       permissions: 'user',
  //     },
  //   ],
  // },
  // {
  //   name: 'Admin',
  //   href: '/admin',
  //   exactMatch: true,
  //   icon: RiAdminFill,
  //   permissions: 'admin',
  //   children: [
  //     {
  //       name: 'User',
  //       href: '/admin/user',
  //       icon: BsJournalMedical,
  //       permissions: 'admin',
  //     },
  //   ],
  // },
];
