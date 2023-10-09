import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';

export const siteSettings = {
  name: 'Project I',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
  author: {
    name: 'marketplace',
    websiteUrl: 'https://redq.io',
    address: '',
  },
  logo: {
    url: '/assets/images/logo.png',
    alt: 'Project I',
    href: '/marketplace',
    width: 70,
    height: 70,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    menu: [
      {
        id: 1,
        path: '/products',
        label: 'menu-categories',
        row: true,
        subMenu: [
          {
            id: 1,
            path: '/products?category=Floor Material',
            label: 'Floor Material',
          },
          {
            id: 2,
            path: '/products?category=Wall Material',
            label: 'Wall Material',
          },
          {
            id: 3,
            path: '/products?category=Roof Material',
            label: 'Roof Material',
          },
          {
            id: 4,
            path: '/products?category=Facade Material',
            label: 'Facade Material',
          },
          {
            id: 5,
            path: '/products?category=Area Material',
            label: 'Area Material',
          },
          {
            id: 6,
            path: '/products?category=Green space material',
            label: 'Green Space Material',
          },
          {
            id: 7,
            path: '/products?category=Door and Window Material',
            label: 'Door and Window Material',
          },
          {
            id: 8,
            path: '/products?category=Smart Material',
            label: 'Smart Material',
          },
          {
            id: 9,
            path: '/products?category=Facility Material',
            label: 'Facility Material',
          },
          {
            id: 10,
            path: '/products?category=Construction Material',
            label: 'Construction Material',
          },
          {
            id: 11,
            path: '/products?category=Security Material',
            label: 'Security Material',
          },
          {
            id: 12,
            path: '/products?category=Lighting  Material',
            label: 'Lighting  Material',
          },
          {
            id: 13,
            path: '/products?category=Pool Material',
            label: 'Pool Material',
          },
          {
            id: 14,
            path: '/products?category=Sports Material',
            label: 'Sports Material',
          },
          {
            id: 15,
            path: '/products?category=Industrial Material',
            label: 'Industrial Material',
          },
          {
            id: 16,
            path: '/products?category=Accessory',
            label: 'Accessory',
          },
          {
            id: 17,
            path: '/products?category=Handicrafts',
            label: 'Handicrafts',
          },
          {
            id: 18,
            path: '/products?category=Fashion Design',
            label: 'Fashion Design',
          },
        ],
      },
      {
        id: 2,
        path: '/suppliers/',
        label: 'Suppliers',
      },

      {
        id: 3,
        path: '/about-us',
        label: 'About',
        subMenu: [
          {
            id: 1,
            path: '/about-us',
            label: 'About Us',
          },

          {
            id: 2,
            path: '/contact-us',
            label: 'menu-contact-us',
          },
        ],
      },
      {
        id: 4,
        path: '/terms',
        label: 'menu-terms-condition',
      },
      {
        id: 5,
        path: '/privacy',
        label: 'menu-privacy-policy',
      },
      {
        id: 6,
        path: '/faq',
        label: 'menu-faq',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'عربى - AR',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'zh',
        name: '中国人 - ZH',
        value: 'zh',
        icon: <CNFlag />,
      },
      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag />,
      },
      {
        id: 'de',
        name: 'Deutsch - DE',
        value: 'de',
        icon: <DEFlag />,
      },
      {
        id: 'he',
        name: 'rעברית - HE',
        value: 'he',
        icon: <ILFlag />,
      },
      {
        id: 'es',
        name: 'Español - ES',
        value: 'es',
        icon: <ESFlag />,
      },
    ],
  },
};
