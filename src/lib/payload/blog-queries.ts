import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media as PayloadMedia } from '@/payload-types'

export interface BlogTag {
  id: number
  name: string
  slug: string
}

export type BlogContentBlock =
  | { type: 'heading'; id: string; level: 'h2' | 'h3'; text: string }
  | { type: 'paragraph'; id: string; text: string }
  | { type: 'image'; id: string; url: string; caption?: string }
  | { type: 'quote'; id: string; text: string; cite?: string }

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  featuredImage: string
  author: string
  publishedDate: string
  tags: BlogTag[]
  content: BlogContentBlock[]
}

export interface BlogListItem {
  id: number
  slug: string
  title: string
  excerpt: string
  featuredImage: string
  author: string
  publishedDate: string
  tags: BlogTag[]
}

function getMediaUrl(media: number | PayloadMedia | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  return media.url ?? ''
}

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')

function toTag(doc: Record<string, unknown>): BlogTag {
  return {
    id: doc.id as number,
    name: (doc.name as string) ?? '',
    slug: (doc.slug as string) ?? '',
  }
}

function toContentBlocks(blocks: unknown): BlogContentBlock[] {
  if (!Array.isArray(blocks)) return []
  const headingCounts = new Map<string, number>()

  return blocks
    .map((b: Record<string, unknown>): BlogContentBlock | null => {
      const blockType = b.blockType as string
      const blockId = (b.id as string) ?? ''

      if (blockType === 'heading') {
        const text = (b.text as string) ?? ''
        const baseId = slugify(text) || blockId
        const count = headingCounts.get(baseId) ?? 0
        headingCounts.set(baseId, count + 1)
        const id = count === 0 ? baseId : `${baseId}-${count}`
        return {
          type: 'heading',
          id,
          level: (b.level as 'h2' | 'h3') ?? 'h2',
          text,
        }
      }
      if (blockType === 'paragraph') {
        return { type: 'paragraph', id: blockId, text: (b.text as string) ?? '' }
      }
      if (blockType === 'image') {
        return {
          type: 'image',
          id: blockId,
          url: getMediaUrl(b.image as number | PayloadMedia),
          caption: (b.caption as string) || undefined,
        }
      }
      if (blockType === 'quote') {
        return {
          type: 'quote',
          id: blockId,
          text: (b.text as string) ?? '',
          cite: (b.cite as string) || undefined,
        }
      }
      return null
    })
    .filter((b): b is BlogContentBlock => b !== null)
}

function toBlogListItem(doc: Record<string, unknown>): BlogListItem {
  const tags = Array.isArray(doc.tags)
    ? doc.tags
        .filter((t): t is Record<string, unknown> => typeof t === 'object' && t !== null)
        .map(toTag)
    : []

  return {
    id: doc.id as number,
    slug: doc.slug as string,
    title: (doc.title as string) ?? '',
    excerpt: (doc.excerpt as string) ?? '',
    featuredImage: getMediaUrl(doc.featuredImage as number | PayloadMedia),
    author: (doc.author as string) ?? '',
    publishedDate: (doc.publishedDate as string) ?? '',
    tags,
  }
}

function toBlogPost(doc: Record<string, unknown>): BlogPost {
  return {
    ...toBlogListItem(doc),
    content: toContentBlocks(doc.content),
  }
}

export async function getBlogPosts(locale: 'en' | 'zh'): Promise<BlogListItem[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'blogs',
    where: { isPublished: { equals: true } },
    sort: '-publishedDate',
    locale,
    depth: 2,
    limit: 100,
    pagination: false,
  })
  return result.docs.map((doc) => toBlogListItem(doc as unknown as Record<string, unknown>))
}

export async function getBlogPostBySlug(
  slug: string,
  locale: 'en' | 'zh',
): Promise<BlogPost | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'blogs',
    where: {
      slug: { equals: slug },
      isPublished: { equals: true },
    },
    locale,
    depth: 2,
    limit: 1,
  })
  if (result.docs.length === 0) return null
  return toBlogPost(result.docs[0] as unknown as Record<string, unknown>)
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'blogs',
    where: { isPublished: { equals: true } },
    limit: 1000,
    pagination: false,
  })
  return result.docs.map((doc) => (doc as unknown as { slug: string }).slug)
}

export async function getAllTags(locale: 'en' | 'zh'): Promise<BlogTag[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'tags',
    locale,
    limit: 100,
    pagination: false,
  })
  return result.docs.map((doc) => toTag(doc as unknown as Record<string, unknown>))
}
