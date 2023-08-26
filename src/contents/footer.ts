import { IconType } from 'react-icons';
import { AiFillInstagram } from 'react-icons/ai';
import { FaLinkedinIn, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RiLineFill } from 'react-icons/ri';

type QuickLink = {
  name: string;
  href: string;
};

type Social = {
  name: string;
  href: string;
  icon: IconType;
};

export const quickLinks: QuickLink[] = [
  {
    name: 'Login',
    href: '/login',
  },
  {
    name: 'Sign Up',
    href: '/register',
  },
];

export const socials: Social[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/seticket',
    icon: FaTwitter,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/seticket',
    icon: AiFillInstagram,
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/@seticket',
    icon: FaYoutube,
  },
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/company/seticket',
    icon: FaLinkedinIn,
  },
  {
    name: 'Tiktok',
    href: 'https://www.tiktok.com/@seticket',
    icon: FaTiktok,
  },
  {
    name: 'Line',
    href: '/',
    icon: RiLineFill,
  },
];
