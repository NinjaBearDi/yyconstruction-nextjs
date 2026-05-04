import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/payload/access'

export const OurTeamPage: GlobalConfig = {
  slug: 'our-team-page',
  label: 'Our Team Page',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        {
          name: 'breadcrumb',
          type: 'array',
          localized: true,
          fields: [{ name: 'label', type: 'text', required: true }],
        },
      ],
    },
    { name: 'sectionTitle', type: 'text', localized: true },
    { name: 'subtitle', type: 'text', localized: true },
    { name: 'subtitleAccent', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'groups',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        {
          name: 'members',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'title', type: 'text', required: true, localized: true },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
