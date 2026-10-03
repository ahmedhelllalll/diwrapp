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
    '/coming-soon',
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    entries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: now,
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : route === '/about' || route === '/advertise' ? 0.8 : 0.6,
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
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : route === '/about' || route === '/advertise' ? 0.8 : 0.6,
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
