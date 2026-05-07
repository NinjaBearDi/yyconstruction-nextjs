'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogListItem, BlogTag } from '@/lib/payload/blog-queries';

interface BlogsListProps {
  posts: BlogListItem[];
  tags: BlogTag[];
  lang: 'en' | 'zh';
  dict: {
    readMore: string;
    allTag: string;
    noResults: string;
  };
}

export default function BlogsList({ posts, tags, lang, dict }: BlogsListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.some((t) => t.slug === activeTag));
  }, [posts, activeTag]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Tag Filter Bar */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 lg:mb-16">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeTag === null
                ? 'bg-[#aa8b57] text-white shadow-md'
                : 'bg-white text-[#192324] border border-gray-200 hover:border-[#aa8b57] hover:text-[#aa8b57]'
            }`}
          >
            {dict.allTag}
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.slug)}
              className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTag === tag.slug
                  ? 'bg-[#aa8b57] text-white shadow-md'
                  : 'bg-white text-[#192324] border border-gray-200 hover:border-[#aa8b57] hover:text-[#aa8b57]'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {/* Blog Cards */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-20">{dict.noResults}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100"
            >
              <Link href={`/${lang}/blogs/${post.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                {post.featuredImage && (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                {post.tags[0] && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#aa8b57] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      {post.tags[0].name}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-gray-400 text-sm mb-4 font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.publishedDate)}
                  {post.author && <span className="mx-2">·</span>}
                  {post.author && <span>{post.author}</span>}
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-[#192324] mb-4 group-hover:text-[#aa8b57] transition-colors duration-300 leading-snug">
                  <Link href={`/${lang}/blogs/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-gray-600 leading-relaxed mb-8 flex-grow line-clamp-3 text-base md:text-[17px]">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50">
                  <Link
                    href={`/${lang}/blogs/${post.slug}`}
                    className="inline-flex items-center text-[#aa8b57] font-bold uppercase tracking-[0.2em] text-sm group/link"
                  >
                    <span className="relative">
                      {dict.readMore}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#aa8b57] transition-all duration-300 group-hover/link:w-full" />
                    </span>
                    <svg className="ml-3 w-5 h-5 transform transition-transform duration-300 group-hover/link:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
