import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media as PayloadMedia } from '@/payload-types'

function getMediaUrl(media: number | PayloadMedia | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  return media.url ?? ''
}

const nonEmptyString = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() !== '' ? v : undefined

const nonEmptyArray = <T>(v: unknown): T[] | undefined =>
  Array.isArray(v) && v.length > 0 ? (v as T[]) : undefined

// ─── About Us Page ───────────────────────────────────────────

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

// ─── Our Team Page ───────────────────────────────────────────

export interface OurTeamMember {
  name: string
  title: string
  image: string
}

export interface OurTeamGroup {
  name: string
  members: OurTeamMember[]
}

export interface OurTeamPageData {
  header: { title: string; breadcrumb: string[] }
  sectionTitle: string
  subtitle: string
  subtitleAccent: string
  description: string
  groups: OurTeamGroup[]
}

export async function getOurTeamPage(
  locale: 'en' | 'zh',
  fallback: OurTeamPageData,
): Promise<OurTeamPageData> {
  const payload = await getPayload({ config })

  const data = (await payload.findGlobal({
    slug: 'our-team-page',
    locale,
    depth: 1,
  })) as unknown as Record<string, unknown>

  const header = (data.header ?? {}) as Record<string, unknown>
  const breadcrumbItems = nonEmptyArray<{ label?: string }>(header.breadcrumb)
  const groupItems = nonEmptyArray<Record<string, unknown>>(data.groups)

  const groups: OurTeamGroup[] | undefined = groupItems
    ? groupItems
        .map((g) => {
          const memberItems = nonEmptyArray<Record<string, unknown>>(g.members)
          if (!nonEmptyString(g.name as unknown) && !memberItems) return null
          return {
            name: (g.name as string) ?? '',
            members: memberItems
              ? memberItems.map((m) => ({
                  name: (m.name as string) ?? '',
                  title: (m.title as string) ?? '',
                  image: getMediaUrl(m.photo as number | PayloadMedia),
                }))
              : [],
          }
        })
        .filter(Boolean) as OurTeamGroup[]
    : undefined

  return {
    header: {
      title: nonEmptyString(header.title) ?? fallback.header.title,
      breadcrumb: breadcrumbItems
        ? breadcrumbItems.map((b) => b.label ?? '').filter(Boolean)
        : fallback.header.breadcrumb,
    },
    sectionTitle: nonEmptyString(data.sectionTitle) ?? fallback.sectionTitle,
    subtitle: nonEmptyString(data.subtitle) ?? fallback.subtitle,
    subtitleAccent: nonEmptyString(data.subtitleAccent) ?? fallback.subtitleAccent,
    description: nonEmptyString(data.description) ?? fallback.description,
    groups: groups && groups.length > 0 ? groups : fallback.groups,
  }
}
