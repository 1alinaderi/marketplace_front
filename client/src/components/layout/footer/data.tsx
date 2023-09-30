export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: 'widget-title-about',
      lists: [
        {
          id: 1,
          title: 'link-about-us',
          path: '/about-us',
        },
        {
          id: 2,
          title: 'link-contact-us',
          path: '/contact-us',
        },
      ],
    },
    {
      id: 2,
      widgetTitle: 'widget-title-our-information',
      lists: [
        {
          id: 1,
          title: 'link-privacy',
          path: '/privacy',
        },
        {
          id: 2,
          title: 'link-terms',
          path: '/terms',
        },
        {
          id: 3,
          title: 'link-return-policy',
          path: '/privacy',
        },
      ],
    },
    {
      id: 3,
      widgetTitle: 'User',
      lists: [
        {
          id: 1,
          title: 'Sign In',
          path: '/signin',
        },
        {
          id: 2,
          title: 'Sgin Up',
          path: '/signup',
        },
      ],
    },
  ],
  payment: [
    {
      id: 1,
      path: '/',
      image: '/assets/images/payment/mastercard.svg',
      name: 'payment-master-card',
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: '/',
      image: '/assets/images/payment/visa.svg',
      name: 'payment-visa',
      width: 50,
      height: 20,
    },
    {
      id: 3,
      path: '/',
      image: '/assets/images/payment/paypal.svg',
      name: 'payment-paypal',
      width: 76,
      height: 20,
    },
    {
      id: 4,
      path: '/',
      image: '/assets/images/payment/jcb.svg',
      name: 'payment-jcb',
      width: 26,
      height: 20,
    },
    {
      id: 5,
      path: '/',
      image: '/assets/images/payment/skrill.svg',
      name: 'payment-skrill',
      width: 39,
      height: 20,
    },
  ],
  social: [
    {
      id: 1,
      path: 'https://www.facebook.com/',
      image: '/assets/images/social/facebook.svg',
      name: 'facebook',
      width: 20,
      height: 20,
    },
    {
      id: 2,
      path: 'https://twitter.com/',
      image: '/assets/images/social/twitter.svg',
      name: 'twitter',
      width: 20,
      height: 20,
    },
    {
      id: 3,
      path: 'https://www.instagram.com/',
      image: '/assets/images/social/instagram.svg',
      name: 'instagram',
      width: 20,
      height: 20,
    },
    {
      id: 4,
      path: 'https://www.youtube.com',
      image: '/assets/images/social/youtube.svg',
      name: 'youtube',
      width: 20,
      height: 20,
    },
  ],
};
