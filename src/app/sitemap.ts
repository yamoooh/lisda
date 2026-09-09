import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lisda-site.org';
  const routes = [
    '',
    '/a-propos',
    '/equipe',
    '/phototheque',
    '/documents',
    '/projets-impact',
    '/contribution',
    '/faire-un-don',
    '/devenir-membre',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
