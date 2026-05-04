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
  // fallback: if queried without locale: 'all', field is a plain string
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

export interface AboutPageData {
  header: { title: string; breadcrumb: string[] }
  sectionTitle: string
  slogan: string
  sloganAccent: string
  teamImage?: string
  paragraphs: string[]
  clientsTitle: string
  clients: string[]
  facilities: { title: string; description: string; icon: string }[]
  visionMission: {
    sectionTitle: string
    sectionSubtitle: string
    sectionSubtitleAccent: string
    sectionDescription: string
    vision: { title: string; description: string }
    mission: { title: string; description: string }
  }
}

const nonEmptyString = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() !== '' ? v : undefined

const nonEmptyArray = <T>(v: unknown): T[] | undefined =>
  Array.isArray(v) && v.length > 0 ? (v as T[]) : undefined

/** Fetch the About Us page global, falling back to dictionary content for empty fields. */
export async function getAboutPage(
  locale: 'en' | 'zh',
  fallback: AboutPageData,
): Promise<AboutPageData> {
  const payload = await getPayload({ config })

  const data = (await payload.findGlobal({
    slug: 'about-page',
    locale,
  })) as unknown as Record<string, unknown>

  const header = (data.header ?? {}) as Record<string, unknown>
  const breadcrumbItems = nonEmptyArray<{ label?: string }>(header.breadcrumb)
  const paragraphItems = nonEmptyArray<{ text?: string }>(data.paragraphs)
  const clientItems = nonEmptyArray<{ name?: string }>(data.clients)
  const facilityItems = nonEmptyArray<{
    title?: string
    description?: string
    icon?: string
  }>(data.facilities)
  const vm = (data.visionMission ?? {}) as Record<string, unknown>
  const vision = (vm.vision ?? {}) as Record<string, unknown>
  const mission = (vm.mission ?? {}) as Record<string, unknown>

  return {
    header: {
      title: nonEmptyString(header.title) ?? fallback.header.title,
      breadcrumb: breadcrumbItems
        ? breadcrumbItems.map((b) => b.label ?? '').filter(Boolean)
        : fallback.header.breadcrumb,
    },
    sectionTitle: nonEmptyString(data.sectionTitle) ?? fallback.sectionTitle,
    slogan: nonEmptyString(data.slogan) ?? fallback.slogan,
    sloganAccent: nonEmptyString(data.sloganAccent) ?? fallback.sloganAccent,
    teamImage: getMediaUrl(data.teamImage as number | PayloadMedia) || fallback.teamImage,
    paragraphs: paragraphItems
      ? paragraphItems.map((p) => p.text ?? '').filter(Boolean)
      : fallback.paragraphs,
    clientsTitle: nonEmptyString(data.clientsTitle) ?? fallback.clientsTitle,
    clients: clientItems
      ? clientItems.map((c) => c.name ?? '').filter(Boolean)
      : fallback.clients,
    facilities: facilityItems
      ? facilityItems.map((f) => ({
          title: f.title ?? '',
          description: f.description ?? '',
          icon: f.icon ?? 'facility-1',
        }))
      : fallback.facilities,
    visionMission: {
      sectionTitle:
        nonEmptyString(vm.sectionTitle) ?? fallback.visionMission.sectionTitle,
      sectionSubtitle:
        nonEmptyString(vm.sectionSubtitle) ?? fallback.visionMission.sectionSubtitle,
      sectionSubtitleAccent:
        nonEmptyString(vm.sectionSubtitleAccent) ??
        fallback.visionMission.sectionSubtitleAccent,
      sectionDescription:
        nonEmptyString(vm.sectionDescription) ??
        fallback.visionMission.sectionDescription,
      vision: {
        title: nonEmptyString(vision.title) ?? fallback.visionMission.vision.title,
        description:
          nonEmptyString(vision.description) ??
          fallback.visionMission.vision.description,
      },
      mission: {
        title: nonEmptyString(mission.title) ?? fallback.visionMission.mission.title,
        description:
          nonEmptyString(mission.description) ??
          fallback.visionMission.mission.description,
      },
    },
  }
}
