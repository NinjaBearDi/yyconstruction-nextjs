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
