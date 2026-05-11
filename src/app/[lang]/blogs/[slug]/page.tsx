import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import {
  getBlogPostBySlug,
  getAllBlogSlugs,
  getBlogPosts,
  type BlogContentBlock,
} from '@/lib/payload/blog-queries';
import BlogToc, { type TocItem } from './BlogToc';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'zh'; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogPostBySlug(slug, lang);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh'; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const post = await getBlogPostBySlug(slug, lang);
  if (!post) notFound();

  const allPosts = await getBlogPosts(lang);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.some((pt) => pt.slug === t.slug)))
    .slice(0, 3);

  const toc: TocItem[] = post.content
    .filter((b): b is Extract<BlogContentBlock, { type: 'heading' }> => b.type === 'heading')
    .map((b) => ({ id: b.id, text: b.text, level: b.level }));

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const tocLabel = lang === 'zh' ? '目录' : 'Contents';
  const backLabel = lang === 'zh' ? '← 返回博客' : '← Back to Blogs';
  const relatedLabel = lang === 'zh' ? '相关文章' : 'Related Posts';

  return (
    <main className="bg-[#f8fcf9]">
      <PageHeader
        title={post.title}
        breadcrumb={[
          { label: dict.blogs.header.breadcrumb[0], href: `/${lang}` },
          { label: dict.blogs.header.breadcrumb[1], href: `/${lang}/blogs` },
          post.title,
        ]}
        lang={lang}
      />

      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          {/* Meta */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.publishedDate)}
              </div>
              {post.author && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author}
                </div>
              )}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t.id}
                      className="bg-[#aa8b57]/10 text-[#aa8b57] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
            )}
          </div>

          {/* Content + TOC */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">
            {/* TOC Sidebar */}
            <aside className="hidden lg:block">
              <BlogToc items={toc} dict={{ contents: tocLabel }} />
            </aside>

            {/* Article Body */}
            <div className="max-w-3xl">
              <BlogContent blocks={post.content} />

              <div className="mt-16 pt-8 border-t border-gray-200">
                <Link
                  href={`/${lang}/blogs`}
                  className="inline-flex items-center text-[#aa8b57] font-bold uppercase tracking-[0.2em] text-sm hover:text-[#192324] transition-colors"
                >
                  {backLabel}
                </Link>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-[#192324] mb-10 text-center">
                {relatedLabel}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/${lang}/blogs/${p.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                  >
                    {p.featuredImage && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={p.featuredImage}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-[#192324] group-hover:text-[#aa8b57] transition-colors leading-snug mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-500">{formatDate(p.publishedDate)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}

function BlogContent({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          if (block.level === 'h2') {
            return (
              <h2
                key={idx}
                id={block.id}
                className="scroll-mt-24 text-2xl md:text-3xl font-bold text-[#192324] mt-12 mb-4"
              >
                {block.text}
              </h2>
            );
          }
          return (
            <h3
              key={idx}
              id={block.id}
              className="scroll-mt-24 text-xl md:text-2xl font-bold text-[#192324] mt-8 mb-3"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === 'paragraph') {
          return (
            <p key={idx} className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {block.text}
            </p>
          );
        }
        if (block.type === 'image' && block.url) {
          return (
            <figure key={idx} className="my-10">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={block.url}
                  alt={block.caption ?? ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 768px"
                />
              </div>
              {block.caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        if (block.type === 'quote') {
          return (
            <blockquote
              key={idx}
              className="my-10 border-l-4 border-[#aa8b57] bg-[#aa8b57]/5 pl-6 py-4 pr-6 rounded-r-lg"
            >
              <p className="text-lg md:text-xl text-[#192324] italic leading-relaxed">
                &ldquo;{block.text}&rdquo;
              </p>
              {block.cite && (
                <cite className="block mt-3 text-sm text-gray-500 not-italic">— {block.cite}</cite>
              )}
            </blockquote>
          );
        }
        return null;
      })}
    </div>
  );
}
