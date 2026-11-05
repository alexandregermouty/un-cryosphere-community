// Helpers that make the platform work both at the root of a domain
// (Firebase Hosting, custom domain) and under a sub-path such as
// https://<user>.github.io/<repository>/ (GitHub Pages project site).
//
// Vite sets import.meta.env.BASE_URL from the `base` option in vite.config.ts.
// It always starts and ends with "/".

export const BASE: string = import.meta.env.BASE_URL || "/";

/** Path of a file in public/ (or a route), prefixed with the deployment base. */
export function asset(path: string): string {
  return BASE + path.replace(/^\/+/, "");
}

/** Absolute URL of a route or file of this deployment, e.g. appUrl("auth/action"). */
export function appUrl(path = ""): string {
  return window.location.origin + asset(path);
}

/** Current pathname with the deployment base removed, always starting with "/". */
export function appPath(pathname: string = window.location.pathname): string {
  const base = BASE.replace(/\/+$/, "");
  if (base && (pathname === base || pathname.startsWith(base + "/"))) {
    return pathname.slice(base.length) || "/";
  }
  return pathname;
}
