const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const BUCKET = "yyconstruction-assets";

/**
 * Get the public URL of a file in the yyconstruction-assets bucket.
 *
 * @example
 *   getStorageUrl("portfolio/modern-kitchen/cover.webp")
 *   // → "https://xxx.supabase.co/storage/v1/object/public/yyconstruction-assets/portfolio/modern-kitchen/cover.webp"
 *
 *   getStorageUrl("homepage/hero-bg.webp")
 *   getStorageUrl("branding/logo.svg")
 *   getStorageUrl("clients/client1.webp")
 */
export function getStorageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
