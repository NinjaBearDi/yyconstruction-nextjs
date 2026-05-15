import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { getServiceBySlug, getAllServices, getAllServiceSlugs } from '@/lib/payload/service-queries';
import PageHeader from '@/components/ui/PageHeader';
import Sidebar from '@/components/ui/Sidebar';

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  const params: { lang: string; slug: string }[] = [];
  for (const slug of slugs) {
    params.push({ lang: 'en', slug });
    params.push({ lang: 'zh', slug });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'zh'; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = await getServiceBySlug(slug, lang);
  if (!service) return { title: 'Not Found' };
  return {
    title: service.title,
    description: service.introP1 ? service.introP1.slice(0, 160) : undefined,
  };
}

export const revalidate = 3600;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh'; slug: string }>;
}) {
  const { lang, slug } = await params;
  const [service, allServices, dict] = await Promise.all([
    getServiceBySlug(slug, lang),
    getAllServices(lang),
    getDictionary(lang),
  ]);

  if (!service) notFound();

  const sidebarServices = allServices.map((s) => ({
    title: s.title,
    href: `/services/${s.slug}`,
  }));

  const activeIndex = allServices.findIndex((s) => s.slug === slug);

  return (
    <main className="bg-white">
      <PageHeader title={service.title} breadcrumb={service.breadcrumb} lang={lang} />

      <div className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-12">

            <aside className="lg:w-1/4">
              <Sidebar
                lang={lang}
                labels={dict.sidebar}
                services={sidebarServices}
                activeServiceIndex={activeIndex}
              />
            </aside>

            <div className="lg:w-3/4 space-y-16">
              {/* Featured Image */}
              {service.featuredImage && (
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.featuredImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              )}

              {/* Intro Text */}
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                {service.introP1 && <p>{service.introP1}</p>}
                {service.introP2 && <p>{service.introP2}</p>}
              </div>

              {/* Detail Sections */}
              <div className="space-y-24">
                {service.sections.map((section, idx) => (
                  <div key={idx} className="space-y-10">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#192324] flex items-center">
                      <span className="w-10 h-1 bg-[#aa8b57] mr-4 shrink-0"></span>
                      {section.title}
                    </h2>

                    {section.description && (
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {section.description}
                      </p>
                    )}

                    <div className={`flex flex-col md:flex-row gap-10 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="md:w-1/2 w-full">
                        {section.image && (
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                              src={section.image}
                              alt={section.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        )}
                      </div>
                      <div className="md:w-1/2 w-full">
                        <ul className="space-y-4">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-2 h-2 bg-[#aa8b57] rounded-full mt-2.5 mr-4 shrink-0"></span>
                              <span className="text-gray-700 font-medium">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
