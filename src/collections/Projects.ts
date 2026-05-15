import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/payload/access'
import { revalidateCollectionHook } from '@/lib/payload/revalidate-hook'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished', 'sortOrder'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateCollectionHook],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Commercial', value: 'commercial' },
        { label: 'Residential', value: 'residential' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'year',
      type: 'text',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'blocks',
      labels: { singular: 'Block', plural: 'Blocks' },
      admin: { description: 'Optional project content displayed below the gallery' },
      blocks: [
        {
          slug: 'heading',
          labels: { singular: 'Heading', plural: 'Headings' },
          fields: [
            {
              name: 'level',
              type: 'select',
              required: true,
              defaultValue: 'h2',
              options: [
                { label: 'H2 (Section)', value: 'h2' },
                { label: 'H3 (Sub-section)', value: 'h3' },
              ],
            },
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
        {
          slug: 'paragraph',
          labels: { singular: 'Paragraph', plural: 'Paragraphs' },
          fields: [
            { name: 'text', type: 'textarea', required: true, localized: true },
          ],
        },
        {
          slug: 'image',
          labels: { singular: 'Image', plural: 'Images' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text', localized: true },
          ],
        },
        {
          slug: 'quote',
          labels: { singular: 'Quote', plural: 'Quotes' },
          fields: [
            { name: 'text', type: 'textarea', required: true, localized: true },
            { name: 'cite', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
