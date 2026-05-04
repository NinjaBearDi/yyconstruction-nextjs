import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/payload/access'

/** 净化文件名：过滤特殊字符，替换空格为短横线 */
function sanitizeFilename(name: string): string {
  const ext = name.lastIndexOf('.') >= 0 ? name.slice(name.lastIndexOf('.')) : ''
  const base = name.slice(0, name.length - ext.length)
  const clean = base
    .replace(/[^\w.-]/g, '-') 
    .replace(/-{2,}/g, '-')   
    .replace(/^-|-$/g, '')    
  return (clean || `upload-${Date.now()}`) + ext.toLowerCase()
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'alt',
    // 🌟 修改点 1：加入了 'filename'，这样列表页最前面就会直接显示图片的缩略图！
    defaultColumns: ['filename', 'alt', 'category', 'updatedAt'], 
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // 净化器：自动格式化分类名称
        if (data.category) {
          data.category = String(data.category)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-');
        }
        return data;
      },
    ],
    beforeOperation: [
      ({ args, operation }) => {
        // 格式化图片本身的文件名
        if ((operation === 'create' || operation === 'update') && args.req?.file) {
          args.req.file.name = sanitizeFilename(args.req.file.name)
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: '图片替代文字（中英文），有助于 SEO 和无障碍阅读',
      }
    },
    {
      name: 'category',
      type: 'text', 
      defaultValue: 'general',
      admin: {
        position: 'sidebar',
        // 🌟 修改点 2：优化了文案提示，因为现在图片不会进子文件夹了，主要是为了后台筛选
        description: '请输入图片分类（如 "portfolio" 或 "team"）。注意：这将作为后台筛选的标签，请尽量保持拼写一致。',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
  },
}