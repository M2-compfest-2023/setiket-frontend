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
    href: '/a',
    color: '',
    description: '',
    image: '/images/categories/concert-n-show.png',
  },
  {
    name: 'Conference',
    href: '/b',
    color: '',
    description: '',
    image: '/images/categories/conference.png',
  },
  {
    name: 'Workshop',
    href: '/c',
    color: '',
    description: '',
    image: '/images/categories/workshop.png',
  },
  {
    name: 'Exhibition',
    href: '/d',
    color: '',
    description: '',
    image: '/images/categories/exhibition.png',
  },
  {
    name: 'Sport & Competition',
    href: '/e',
    color: '',
    description: '',
    image: '/images/categories/sports-n-competition.png',
  },
];
