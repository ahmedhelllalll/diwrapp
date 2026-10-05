import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://diwrapp.com';
  const routes = [
    '',
    '/about',
    '/advertise',
    '/blog',
    '/culture',
    '/contact',
    '/join-us',
    '/wallet',
    '/ask-di',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookie-policy',
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const isLegal = route === '/privacy-policy' || route === '/terms-and-conditions' || route === '/cookie-policy';
    const isHigh = route === '/about' || route === '/advertise';
    const isHome = route === '';

    entries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: now,
      changeFrequency: isHome ? 'daily' : isLegal ? 'monthly' : 'weekly',
      priority: isHome ? 1.0 : isHigh ? 0.8 : isLegal ? 0.5 : 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route}`,
          ar: `${baseUrl}/ar${route}`,
        },
      },
    });

    entries.push({
      url: `${baseUrl}/ar${route}`,
      lastModified: now,
      changeFrequency: isHome ? 'daily' : isLegal ? 'monthly' : 'weekly',
      priority: isHome ? 1.0 : isHigh ? 0.8 : isLegal ? 0.5 : 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route}`,
          ar: `${baseUrl}/ar${route}`,
        },
      },
    });
  }

  return entries;
}
