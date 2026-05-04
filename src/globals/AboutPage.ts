import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/payload/access'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Us Page',
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
    { name: 'slogan', type: 'text', localized: true },
    { name: 'sloganAccent', type: 'text', localized: true },
    {
      name: 'teamImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Team photo shown above the client list' },
    },
    {
      name: 'paragraphs',
      type: 'array',
      localized: true,
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    { name: 'clientsTitle', type: 'text', localized: true },
    {
      name: 'clients',
      type: 'array',
      localized: true,
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'facilities',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Facility Icon 1', value: 'facility-1' },
            { label: 'Facility Icon 2', value: 'facility-2' },
          ],
        },
      ],
    },
    {
      name: 'visionMission',
      type: 'group',
      fields: [
        { name: 'sectionTitle', type: 'text', localized: true },
        { name: 'sectionSubtitle', type: 'text', localized: true },
        { name: 'sectionSubtitleAccent', type: 'text', localized: true },
        { name: 'sectionDescription', type: 'textarea', localized: true },
        {
          name: 'vision',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
        },
        {
          name: 'mission',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
        },
      ],
    },
  ],
}
