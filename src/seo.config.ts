// @SEE https://www.npmjs.com/package/next-seo#default-seo-configuration

import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.seticket.com/',
    siteName: 'SiteName',
    images: [
      {
        url: `https://seticket.com/images/og/logo.png`,
        width: 1200,
        height: 630,
        alt: 'SeTicket',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  titleTemplate: '%s | SeTicket',
  description:
    'SeTicket adalah salah satu event terbesar yang diselenggarakan oleh peserta SEA Compfest. SeTicket merupakan event yang berfokus pada website pembuatan event.',
  defaultTitle: 'SeTicket',
  additionalLinkTags: [
    {
      rel: 'png',
      href: '/favicon.ico',
    },
  ],
};

export default config;
