import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/payload/access'
import { revalidateCollectionHook } from '@/lib/payload/revalidate-hook'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'author', 'publishedDate', 'isPublished'],
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Short summary shown on the blog list cards' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Author name (e.g. "Y&Y Team")' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' },
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'content',
      type: 'blocks',
      required: true,
      labels: { singular: 'Block', plural: 'Blocks' },
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
                { label: 'H2 (Top-level section)', value: 'h2' },
                { label: 'H3 (Sub-section)', value: 'h3' },
              ],
            },
            {
              name: 'text',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
        {
          slug: 'paragraph',
          labels: { singular: 'Paragraph', plural: 'Paragraphs' },
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
              localized: true,
            },
          ],
        },
        {
          slug: 'image',
          labels: { singular: 'Image', plural: 'Images' },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          slug: 'quote',
          labels: { singular: 'Quote', plural: 'Quotes' },
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'cite',
              type: 'text',
              localized: true,
              admin: { description: 'Source/author of the quote (optional)' },
            },
          ],
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
