/**
 * Whether `pathname` is the page at `href` or one of its descendants.
 * "/" only matches itself, so the home link is not active on every page.
 */
export function isActivePath(pathname: string, href: string): boolean {
  const path = href.split(/[?#]/)[0] ?? href;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}
