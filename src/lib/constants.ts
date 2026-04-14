export const DEFAULT_REDIRECT_URL = '/';

export const PUBLIC_ROUTES = [
  '/',
  '/blog',
  '/videos',
  '/about',
];

export const AUTH_ROUTES = [
  '/admin/login',
];

export const PROTECTED_ROUTES = [
  '/admin',
  '/admin/posts',
  '/admin/posts/new',
  '/admin/posts/:id',
  '/admin/videos',
  '/admin/pages',
];
