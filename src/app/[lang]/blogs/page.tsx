import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';

export default async function BlogsPage({ 
  params 
}: { 
  params: Promise<{ lang: 'en' | 'zh' }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.blogs;

  return (
    <main className="bg-[#f8fcf9]">
      {/* Page Banner */}
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      <div className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.posts.map((post: any) => (
              <article 
                key={post.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100"
              >
                {/* Blog Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#aa8b57] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Blog Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-gray-400 text-sm mb-4 font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.date}
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-[#192324] mb-4 group-hover:text-[#aa8b57] transition-colors duration-300 leading-snug">
                    <Link href="#">{post.title}</Link>
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-8 flex-grow line-clamp-3 text-base md:text-[17px]">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <Link 
                      href="#" 
                      className="inline-flex items-center text-[#aa8b57] font-bold uppercase tracking-[0.2em] text-sm group/link"
                    >
                      <span className="relative">
                        {data.readMore}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#aa8b57] transition-all duration-300 group-hover/link:w-full"></span>
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
        </div>
      </div>
    </main>
  );
}
