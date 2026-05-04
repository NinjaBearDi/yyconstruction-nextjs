import React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import { getProjects } from '@/lib/payload/queries';
import PortfolioGrid from './PortfolioGrid';

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
