import type { MetadataRoute } from 'next'
import { getAllBlogSlugs } from '@/lib/payload/blog-queries'
import { getAllProjectSlugs } from '@/lib/payload/project-queries'
import { getAllServiceSlugs } from '@/lib/payload/service-queries'

const BASE_URL = 'https://yyconstruction.ca'
const LANGS = ['en', 'zh'] as const

const STATIC_PATHS = [
  '',
  '/about-us',
  '/our-team',
  '/services',
  '/portfolio',
  '/blogs',
  '/faq',
  '/join-us',
  '/contact-us',
  '/evaluation',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Static pages — both languages
  for (const lang of LANGS) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${lang}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${path}`,
            zh: `${BASE_URL}/zh${path}`,
          },
        },
      })
    }
  }

  // Dynamic: blog posts
  try {
    const blogSlugs = await getAllBlogSlugs()
    for (const lang of LANGS) {
      for (const slug of blogSlugs) {
        entries.push({
          url: `${BASE_URL}/${lang}/blogs/${slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              en: `${BASE_URL}/en/blogs/${slug}`,
              zh: `${BASE_URL}/zh/blogs/${slug}`,
            },
          },
        })
      }
    }
  } catch (e) {
    console.warn('Sitemap: failed to load blog slugs', e)
  }

  // Dynamic: portfolio projects
  try {
    const projectSlugs = await getAllProjectSlugs()
    for (const lang of LANGS) {
      for (const slug of projectSlugs) {
        entries.push({
          url: `${BASE_URL}/${lang}/portfolio/${slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              en: `${BASE_URL}/en/portfolio/${slug}`,
              zh: `${BASE_URL}/zh/portfolio/${slug}`,
            },
          },
        })
      }
    }
  } catch (e) {
    console.warn('Sitemap: failed to load project slugs', e)
  }

  // Dynamic: services
  try {
    const serviceSlugs = await getAllServiceSlugs()
    for (const lang of LANGS) {
      for (const slug of serviceSlugs) {
        entries.push({
          url: `${BASE_URL}/${lang}/services/${slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              en: `${BASE_URL}/en/services/${slug}`,
              zh: `${BASE_URL}/zh/services/${slug}`,
            },
          },
        })
      }
    }
  } catch (e) {
    console.warn('Sitemap: failed to load service slugs', e)
  }

  return entries
}
