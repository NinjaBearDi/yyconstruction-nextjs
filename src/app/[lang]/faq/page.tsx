import React from 'react';
import Image from 'next/image';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import FaqAccordion from './FaqAccordion';

const S3_BASE = 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca';

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.faq;

  return (
    <main className="bg-white">
      {/* Page Banner */}
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left - Accordion (7/12) */}
            <div className="lg:w-7/12">
              <FaqAccordion questions={data.questions} />
            </div>

            {/* Right - Image (5/12) */}
            <div className="lg:w-5/12">
              <div className="relative rounded-2xl overflow-hidden shadow-xl sticky top-8">
                <div className="aspect-[1/1.26]">
                  <Image
                    src={`${S3_BASE}/green-1.jpg`}
                    alt="Y&Y Construction"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
