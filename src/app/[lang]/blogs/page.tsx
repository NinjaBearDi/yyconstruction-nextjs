import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { getDictionary } from '@/lib/get-dictionary';
import { getBlogPosts, getAllTags } from '@/lib/payload/blog-queries';
import BlogsList from './BlogsList';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'zh' ? '博客' : 'Blog',
    description: lang === 'zh'
      ? '装修设计趋势、施工技巧、项目案例分享 — 右岩建筑博客。'
      : 'Renovation trends, construction tips, and project insights from Y&Y Construction.',
  };
}

export const revalidate = 3600;

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.blogs;

  const [posts, tags] = await Promise.all([getBlogPosts(lang), getAllTags(lang)]);

  return (
    <main className="bg-[#f8fcf9]">
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      <div className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <BlogsList
            posts={posts}
            tags={tags}
            lang={lang}
            dict={{
              readMore: data.readMore,
              allTag: lang === 'zh' ? '全部' : 'All',
              noResults: lang === 'zh' ? '暂无文章' : 'No posts found',
            }}
          />
        </div>
      </div>
    </main>
  );
}
