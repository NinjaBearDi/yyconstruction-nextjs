import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import { getProjectBySlug, getRelatedProjects, getAllProjectSlugs } from '@/lib/payload/project-queries';
import ProjectGallery from './ProjectGallery';

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'zh'; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Not Found' };
  const title = lang === 'zh' ? project.title.zh : project.title.en;
  const description = lang === 'zh' ? project.description.zh : project.description.en;
  return {
    title,
    description: description ? description.slice(0, 160) : undefined,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh'; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const data = dict.portfolioPage;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(slug, 3);

  return (
    <main className="bg-[#f8fcf9]">
      {/* Page Banner */}
      <PageHeader
        title={project.title[lang]}
        breadcrumb={[
          data.header.breadcrumb[0],
          data.header.breadcrumb[1],
          project.title[lang],
        ]}
        lang={lang}
      />

      <div className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          {/* Top row: Back link (left col) + Gallery title (right col) on same baseline */}
          <div className="flex flex-col lg:flex-row gap-x-16 mb-10">
            <div className="lg:w-1/3 flex items-center">
              <Link
                href={`/${lang}/portfolio`}
                className="inline-flex items-center text-[#aa8b57] font-bold uppercase tracking-widest text-sm group hover:text-[#192324] transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                {data.detail.backToPortfolio}
              </Link>
            </div>
            <div className="lg:w-2/3 flex items-center mt-4 lg:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#192324] flex items-center">
                <span className="w-10 h-1 bg-[#aa8b57] mr-4 shrink-0" />
                {data.detail.gallery}
              </h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-32 space-y-10">
                {/* Project Info Card - matching Sidebar component bg-[#5D6667] */}
                <div className="bg-[#5D6667] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight border-b-2 border-white/20 pb-4">
                    {project.title[lang]}
                  </h1>

                  {/* Project Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-8">
                    {project.description[lang]}
                  </p>

                  <div className="space-y-5">
                    {/* Project Type */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 mr-4">
                        <svg
                          className="w-5 h-5 text-[#aa8b57]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 font-medium uppercase tracking-wider">
                          {data.detail.projectType}
                        </p>
                        <p className="text-white font-bold mt-0.5">
                          {project.category === 'commercial'
                            ? data.detail.commercial
                            : data.detail.residential}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 mr-4">
                        <svg
                          className="w-5 h-5 text-[#aa8b57]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 font-medium uppercase tracking-wider">
                          {data.detail.location}
                        </p>
                        <p className="text-white font-bold mt-0.5">
                          {project.location[lang]}
                        </p>
                      </div>
                    </div>

                    {/* Year */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 mr-4">
                        <svg
                          className="w-5 h-5 text-[#aa8b57]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 font-medium uppercase tracking-wider">
                          {data.detail.year}
                        </p>
                        <p className="text-white font-bold mt-0.5">
                          {project.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Card - matching Sidebar CTA bg-[#5D6667] */}
                <div className="relative overflow-hidden rounded-2xl bg-[#5D6667] p-10 text-white group border border-white/5 shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-[#aa8b57] opacity-20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight leading-tight">
                      {data.detail.ctaTitle}
                    </h3>
                    <p className="text-white/70 mb-8 leading-relaxed">
                      {data.detail.ctaDescription}
                    </p>
                    <div className="space-y-4">
                      <a
                        href="tel:+1(604)349-9888"
                        className="flex items-center space-x-4 hover:text-[#F1D19D] transition-colors group/contact"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/contact:bg-[#aa8b57]/30 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <span className="font-bold">+1 (604) 349-9888</span>
                      </a>
                      <a
                        href="mailto:info@yyconstruction.ca"
                        className="flex items-center space-x-4 hover:text-[#F1D19D] transition-colors group/contact"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/contact:bg-[#aa8b57]/30 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span className="font-bold">info@yyconstruction.ca</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Content - Gallery */}
            <div className="lg:w-2/3">
              <ProjectGallery
                images={project.gallery}
                projectTitle={project.title[lang]}
              />
            </div>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="mt-24 lg:mt-32">
              <h2 className="text-2xl md:text-3xl font-bold text-[#192324] mb-12 flex items-center">
                <span className="w-10 h-1 bg-[#aa8b57] mr-4 shrink-0" />
                {data.detail.relatedProjects}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/${lang}/portfolio/${rp.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-6">
                      <Image
                        src={rp.featuredImage}
                        alt={rp.title[lang]}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 group-hover:bg-[#192324] backdrop-blur-md rounded-full flex items-center justify-center overflow-hidden transition-colors duration-400">
                          <Image
                            src="/images/arrow-white.svg"
                            alt="View Project"
                            width={24}
                            height={24}
                            className="block -rotate-45 group-hover:rotate-0 transition-transform duration-400 ease-in-out w-auto h-auto"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[#aa8b57] text-sm font-bold uppercase tracking-widest">
                        {rp.category === 'commercial'
                          ? data.filters.commercial
                          : data.filters.residential}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-[#192324] group-hover:text-[#aa8b57] transition-colors duration-300">
                        {rp.title[lang]}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
