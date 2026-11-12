/**
 * The API stores a user's picture as `img_path`, which is sometimes an
 * absolute URL and sometimes a bare object key in the Nitx S3 bucket. Rendering
 * the key as-is resolves it against the dashboard's own origin, 404s, and the
 * avatar silently falls back to initials. Studio already resolves keys through
 * this bucket; every other product rendered the raw value, which is why the
 * picture "sometimes" did not show.
 */
export const DEFAULT_AVATAR_BASE_URL =
  "https://nitx-v2.s3.eu-west-1.amazonaws.com";

/**
 * Turns an `img_path` value into something an `<img>` can load.
 *
 * - Empty / null / whitespace -> `undefined` (lets the initials fallback show
 *   without firing a request for "/undefined").
 * - Absolute (`http://`, `https://`, `//`), `data:` and `blob:` URLs, and
 *   same-origin paths starting with `/` are returned untouched.
 * - Anything else is treated as an object key under `baseUrl`.
 */
export function resolveAvatarUrl(
  path: string | null | undefined,
  baseUrl: string = DEFAULT_AVATAR_BASE_URL
): string | undefined {
  if (typeof path !== "string") return undefined;
  const value = path.trim();
  if (!value) return undefined;
  if (/^(https?:)?\/\//i.test(value)) return value;
  if (/^(data|blob):/i.test(value)) return value;
  if (value.startsWith("/")) return value;
  return `${baseUrl.replace(/\/+$/, "")}/${value.replace(/^\/+/, "")}`;
}
