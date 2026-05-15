import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const LANGS = ['en', 'zh'] as const;

const COLLECTION_PATHS: Record<string, (slug?: string) => string[]> = {
  projects: (slug) => {
    const paths = ['/[lang]/portfolio', '/[lang]'];
    if (slug) paths.push(`/[lang]/portfolio/${slug}`);
    return paths;
  },
  blogs: (slug) => {
    const paths = ['/[lang]/blogs'];
    if (slug) paths.push(`/[lang]/blogs/${slug}`);
    return paths;
  },
  services: (slug) => {
    const paths = ['/[lang]/services', '/[lang]'];
    if (slug) paths.push(`/[lang]/services/${slug}`);
    return paths;
  },
};

const GLOBAL_PATHS: Record<string, string[]> = {
  'about-page': ['/[lang]/about-us'],
  'our-team-page': ['/[lang]/our-team'],
};

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { collection?: string; global?: string; slug?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const revalidated: string[] = [];

  if (body.collection && COLLECTION_PATHS[body.collection]) {
    const templates = COLLECTION_PATHS[body.collection](body.slug);
    for (const template of templates) {
      for (const lang of LANGS) {
        const path = template.replace('[lang]', lang);
        revalidatePath(path);
        revalidated.push(path);
      }
    }
  } else if (body.global && GLOBAL_PATHS[body.global]) {
    for (const template of GLOBAL_PATHS[body.global]) {
      for (const lang of LANGS) {
        const path = template.replace('[lang]', lang);
        revalidatePath(path);
        revalidated.push(path);
      }
    }
  } else {
    return NextResponse.json(
      { error: 'Unknown collection or global. Provide { collection } or { global } in body.' },
      { status: 400 },
    );
  }

  return NextResponse.json({ revalidated, now: Date.now() });
}
