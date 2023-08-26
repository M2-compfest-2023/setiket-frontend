export type Category = {
  name: string;
  href: string;
  color: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    name: 'Concert',
    href: '/events/category/1',
    color: '',
    description: '',
    image: '/images/categories/concert-n-show.png',
  },
  {
    name: 'Conference',
    href: '/events/category/2',
    color: '',
    description: '',
    image: '/images/categories/conference.png',
  },
  {
    name: 'Workshop',
    href: '/events/category/3',
    color: '',
    description: '',
    image: '/images/categories/workshop.png',
  },
  {
    name: 'Exhibition',
    href: '/events/category/4',
    color: '',
    description: '',
    image: '/images/categories/exhibition.png',
  },
  {
    name: 'Sport & Competition',
    href: '/events/category/5',
    color: '',
    description: '',
    image: '/images/categories/sports-n-competition.png',
  },
];
