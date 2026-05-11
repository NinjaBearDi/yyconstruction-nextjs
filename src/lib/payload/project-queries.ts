import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media as PayloadMedia } from '@/payload-types'

/** Normalized project shape used by components */
export interface Project {
  id: number
  slug: string
  title: { en: string; zh: string }
  description: { en: string; zh: string }
  category: 'commercial' | 'residential'
  location: { en: string; zh: string }
  year: string
  featuredImage: string
  gallery: string[]
}

export type ProjectContentBlock =
  | { type: 'heading'; id: string; level: 'h2' | 'h3'; text: string }
  | { type: 'paragraph'; id: string; text: string }
  | { type: 'image'; id: string; url: string; caption?: string }
  | { type: 'quote'; id: string; text: string; cite?: string }

export interface ProjectWithContent extends Project {
  content: ProjectContentBlock[]
}

/** Extract URL from a populated Media relation */
function getMediaUrl(media: number | PayloadMedia | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  return media.url ?? ''
}

/** Extract localized string from a Payload locale-all field */
function getLocalized(field: unknown): { en: string; zh: string } {
  if (field && typeof field === 'object' && 'en' in field) {
    const obj = field as Record<string, string>
    return { en: obj.en ?? '', zh: obj.zh ?? '' }
  }
  const str = typeof field === 'string' ? field : ''
  return { en: str, zh: str }
}

/** Convert a Payload project doc (queried with locale:'all', depth:1) to the component shape */
function toProject(doc: Record<string, unknown>): Project {
  const gallery = Array.isArray(doc.gallery)
    ? doc.gallery
        .map((item: Record<string, unknown>) => getMediaUrl(item.image as number | PayloadMedia))
        .filter(Boolean)
    : []

  return {
    id: doc.id as number,
    slug: doc.slug as string,
    title: getLocalized(doc.title),
    description: getLocalized(doc.description),
    category: doc.category as 'commercial' | 'residential',
    location: getLocalized(doc.location),
    year: (doc.year as string) ?? '',
    featuredImage: getMediaUrl(doc.featuredImage as number | PayloadMedia),
    gallery,
  }
}

/** Fetch all published projects, ordered by sortOrder */
export async function getProjects(): Promise<Project[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: { isPublished: { equals: true } },
    sort: 'sortOrder',
    locale: 'all',
    depth: 1,
    limit: 100,
    pagination: false,
  })

  return result.docs.map((doc) => toProject(doc as unknown as Record<string, unknown>))
}

/** Fetch a single project by slug */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      isPublished: { equals: true },
    },
    locale: 'all',
    depth: 1,
    limit: 1,
  })

  if (result.docs.length === 0) return null
  return toProject(result.docs[0] as unknown as Record<string, unknown>)
}

/** Fetch related projects (same category, excluding current slug) */
export async function getRelatedProjects(slug: string, limit = 3): Promise<Project[]> {
  const current = await getProjectBySlug(slug)
  if (!current) return []

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: {
      isPublished: { equals: true },
      category: { equals: current.category },
      slug: { not_equals: slug },
    },
    sort: 'sortOrder',
    locale: 'all',
    depth: 1,
    limit,
  })

  return result.docs.map((doc) => toProject(doc as unknown as Record<string, unknown>))
}

/** Fetch all slugs (for generateStaticParams) */
export async function getAllProjectSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: { isPublished: { equals: true } },
    limit: 1000,
    pagination: false,
  })

  return result.docs.map((doc) => doc.slug)
}

function toContentBlocks(blocks: unknown): ProjectContentBlock[] {
  if (!Array.isArray(blocks)) return []
  const slugify = (text: string): string =>
    text.toLowerCase().trim().replace(/[^\w\u4e00-\u9fa5\s-]/g, '').replace(/\s+/g, '-')
  const headingCounts = new Map<string, number>()

  return blocks
    .map((b: Record<string, unknown>): ProjectContentBlock | null => {
      const blockType = b.blockType as string
      const blockId = (b.id as string) ?? ''

      if (blockType === 'heading') {
        const text = (b.text as string) ?? ''
        const baseId = slugify(text) || blockId
        const count = headingCounts.get(baseId) ?? 0
        headingCounts.set(baseId, count + 1)
        const id = count === 0 ? baseId : `${baseId}-${count}`
        return { type: 'heading', id, level: (b.level as 'h2' | 'h3') ?? 'h2', text }
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
    .filter((b): b is ProjectContentBlock => b !== null)
}

/** Fetch a single project with locale-specific content blocks */
export async function getProjectWithContent(
  slug: string,
  locale: 'en' | 'zh',
): Promise<ProjectWithContent | null> {
  const project = await getProjectBySlug(slug)
  if (!project) return null

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug }, isPublished: { equals: true } },
    locale,
    depth: 1,
    limit: 1,
  })

  if (result.docs.length === 0) return { ...project, content: [] }
  const doc = result.docs[0] as unknown as Record<string, unknown>
  return { ...project, content: toContentBlocks(doc.content) }
}
