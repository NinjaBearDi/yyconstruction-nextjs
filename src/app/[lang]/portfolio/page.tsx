import React from 'react';
import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import { getProjects } from '@/lib/payload/project-queries';
import PortfolioGrid from './PortfolioGrid';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'zh' ? '项目案例' : 'Portfolio',
    description: lang === 'zh'
      ? '浏览右岩建筑的商业与住宅装修项目案例，包括餐厅、办公室、住宅翻新等。'
      : 'Browse Y&Y Construction commercial and residential renovation projects including restaurants, offices, and home renovations.',
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.portfolioPage;
  const projects = await getProjects();

  return (
    <main className="bg-[#f8fcf9]">
      {/* Page Banner */}
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      <div className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <PortfolioGrid
            projects={projects}
            lang={lang}
            filters={data.filters}
            projectCount={data.projectCount}
          />
        </div>
      </div>
    </main>
  );
}
