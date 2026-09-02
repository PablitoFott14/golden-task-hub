/** Join class names, dropping anything falsy. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Resolve a path under `public/` against the deployed base, percent-encoding
 * each segment. Input filenames carry spaces, so never build these by hand.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return base.replace(/\/$/, "") + "/" + encoded;
}
