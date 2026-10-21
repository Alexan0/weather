export function isPageActive(pathname: string, pagePath: string) {
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';

  return normalizedPathname === pagePath || (pagePath !== '/' && normalizedPathname.endsWith(pagePath));
}
