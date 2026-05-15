export const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://tinylink.example.com').replace(/\/$/, '');

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export const DEFAULT_OG_IMAGE = absoluteUrl('/og-cover.png');
