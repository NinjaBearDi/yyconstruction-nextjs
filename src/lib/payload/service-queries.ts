import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media as PayloadMedia } from '@/payload-types'

export interface ServiceSection {
  title: string
  description?: string
  image: string
  items: string[]
}

export interface Service {
  slug: string
  title: string
  breadcrumb: string[]
  introP1: string
  introP2: string
  featuredImage: string
  sections: ServiceSection[]
}

export interface ServiceLink {
  title: string
  slug: string
}

function getMediaUrl(media: number | PayloadMedia | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  return media.url ?? ''
}

function toService(doc: Record<string, unknown>, locale: 'en' | 'zh'): Service {
  const breadcrumbArr = Array.isArray(doc.breadcrumb)
    ? doc.breadcrumb.map((b: Record<string, unknown>) => String(b.label ?? ''))
    : []

  const sections = Array.isArray(doc.sections)
    ? doc.sections.map((s: Record<string, unknown>) => {
        const items = Array.isArray(s.items)
          ? s.items.map((item: Record<string, unknown>) => String(item.text ?? ''))
          : []
        return {
          title: String(s.title ?? ''),
          description: s.description ? String(s.description) : undefined,
          image: getMediaUrl(s.image as number | PayloadMedia),
          items,
        }
      })
    : []

  return {
    slug: String(doc.slug ?? ''),
    title: String(doc.title ?? ''),
    breadcrumb: breadcrumbArr,
    introP1: String(doc.introP1 ?? ''),
    introP2: String(doc.introP2 ?? ''),
    featuredImage: getMediaUrl(doc.featuredImage as number | PayloadMedia),
    sections,
  }
}

export async function getServiceBySlug(slug: string, locale: 'en' | 'zh'): Promise<Service | null> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
      isPublished: { equals: true },
    },
    locale,
    depth: 1,
    limit: 1,
  })

  if (result.docs.length === 0) return null
  return toService(result.docs[0] as unknown as Record<string, unknown>, locale)
}

export async function getAllServices(locale: 'en' | 'zh'): Promise<ServiceLink[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'services',
    where: { isPublished: { equals: true } },
    sort: 'sortOrder',
    locale,
    depth: 0,
    limit: 100,
    pagination: false,
  })

  return result.docs.map((doc) => ({
    title: String((doc as unknown as Record<string, unknown>).title ?? ''),
    slug: String((doc as unknown as Record<string, unknown>).slug ?? ''),
  }))
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'services',
    where: { isPublished: { equals: true } },
    limit: 100,
    pagination: false,
  })

  return result.docs.map((doc) => String((doc as unknown as Record<string, unknown>).slug ?? ''))
}
