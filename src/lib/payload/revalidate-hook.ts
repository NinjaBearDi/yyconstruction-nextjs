import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload';

const REVALIDATE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`
  : 'http://localhost:3000/api/revalidate';

async function triggerRevalidate(body: Record<string, string>) {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) return;

  try {
    await fetch(REVALIDATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(body),
    });
  } catch {
    // Non-critical: don't block CMS save if revalidation fails
  }
}

export const revalidateCollectionHook: CollectionAfterChangeHook = async ({ collection, doc }) => {
  const slug = doc?.slug as string | undefined;
  await triggerRevalidate({ collection: collection.slug, ...(slug ? { slug } : {}) });
  return doc;
};

export const revalidateGlobalHook: GlobalAfterChangeHook = async ({ global, doc }) => {
  await triggerRevalidate({ global: global.slug });
  return doc;
};
