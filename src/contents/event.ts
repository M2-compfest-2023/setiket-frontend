type Event = {
  name: string;
  href: string;
  color: string;
  hover: string;
  description: string;
};

export const events: Event[] = [
  {
    name: 'Se Ticket',
    href: '/',
    color: 'text-danger-40',
    hover: 'hover:text-danger-30',
    description:
      'Step up and unleash your potential through our programming contest!',
  },
];
