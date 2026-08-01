import { writeFileSync } from 'node:fs';

const rawSiteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://tinylink.userhali.com';
const siteUrl = rawSiteUrl.replace(/\/$/, '');

const publicRoutes = [
  '/',
  '/about',
  '/services',
  '/pricing',
  '/help',
  '/faq',
  '/privacy',
  '/terms',
  '/disclaimer',
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes
  .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
  .join('\n')}\n</urlset>\n`;

const robotsTxt = `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\nDisallow: /dashboard/\nDisallow: /user/\nDisallow: /login\nDisallow: /register\nDisallow: /checkout\nDisallow: /payment/\nDisallow: /pay/\nDisallow: /notify\nDisallow: /callback\nDisallow: /order/detail/\nDisallow: /code/\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

writeFileSync('public/sitemap.xml', sitemapXml, 'utf8');
writeFileSync('public/robots.txt', robotsTxt, 'utf8');

console.log(`Generated public/sitemap.xml and public/robots.txt for ${siteUrl}`);
