import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { getAboutPage } from '@/lib/payload/global-queries';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'zh' ? '关于我们' : 'About Us',
    description: lang === 'zh'
      ? '右岩建筑是温哥华全方位设计施工一体化公司，专注商业与住宅装修，十年经验，30+专业团队。'
      : 'Y&Y Design Build is a Vancouver-based full-service design and construction firm specializing in commercial and residential renovations.',
  };
}

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = await getAboutPage(lang, {
    ...dict.aboutUs,
    teamImage: 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/team/team.jpg',
  });

  const facilityIcons: Record<string, string> = {
    'facility-1': '/images/icon-about-facility-1.svg',
    'facility-2': '/images/icon-about-facility-2.svg',
  };

  return (
    <main className="bg-white">
      {/* Page Banner */}
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      {/* About Section */}
      <section className="py-20 lg:py-28 relative">
        {/* Background Shape */}
        <div className="absolute bottom--20 left-0 w-full h-full pointer-events-none">
          <Image
            src="/images/section-bg-shape-1.svg"
            alt=""
            fill
            className="object-contain object-left"
          />
        </div>
        <div className="container mx-auto px-4 md:px-10 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Content - 7/12 */}
            <div className="lg:w-7/12">
              <div className="space-y-6">
                {/* Section Title */}
                <div className="flex items-center mb-2">
                  <span className="w-12 h-0.5 bg-[#aa8b57] mr-4 shrink-0 inline-block"></span>
                  <h3 className="text-[#aa8b57] text-lg md:text-xl font-bold uppercase tracking-wider">
                    {data.sectionTitle}
                  </h3>
                </div>

                {/* Slogan */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#192324] leading-tight tracking-tight">
                  {data.slogan}
                  <br />
                  <span className="text-[#aa8b57]">{data.sloganAccent}</span>
                </h2>

                {/* Paragraphs */}
                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  {data.paragraphs.map((p: string, idx: number) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - 5/12 */}
            <div className="lg:w-5/12 space-y-8">
              {/* Team Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={data.teamImage || 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/team/team.jpg'}
                  alt="Y&Y Construction Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* Client List */}
              <div className="px-2">
                <p className="text-[#192324] font-semibold text-lg mb-4">
                  {data.clientsTitle}
                </p>
                <ul className="space-y-2.5">
                  {data.clients.map((client: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 mt-0.5 mr-3 shrink-0 text-[#d1ba8c]" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                      </svg>
                      <span className="text-gray-700">{client}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Facility Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 lg:mt-20">
            {data.facilities.map(
              (
                facility: { title: string; description: string; icon: string },
                idx: number
              ) => (
                <div
                  key={idx}
                  className="group flex items-start gap-5 p-6 rounded-2xl bg-gray-50 hover:bg-[#192324] transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="w-16 h-16 shrink-0 rounded-xl bg-[#d1ba8c] shadow-md flex items-center justify-center group-hover:bg-[#192324] transition-colors duration-500">
                    <Image
                      src={facilityIcons[facility.icon]}
                      alt={facility.title}
                      width={36}
                      height={36}
                      className="group-hover:brightness-0 group-hover:invert transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#192324] group-hover:text-white capitalize mb-2 transition-colors duration-500">
                      {facility.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-500">
                      {facility.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative overflow-hidden">
        {/* Top half: dark background for the header */}
        <div className="bg-[#192324] pt-20 lg:pt-28 pb-38 lg:pb-50 relative">
          {/* Decorative Shape */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
            <Image
              src="/images/section-bg-shape-1.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div className="container mx-auto px-4 md:px-10 lg:px-16 relative z-10">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
              <div className="lg:w-1/2">
                <SectionHeader
                  title={data.visionMission.sectionTitle}
                  subtitle={
                    <>
                      {data.visionMission.sectionSubtitle}{' '}
                      {data.visionMission.sectionSubtitleAccent && (
                        <span className="text-[#aa8b57]">
                          {data.visionMission.sectionSubtitleAccent}
                        </span>
                      )}
                    </>
                  }
                  light
                />
              </div>
              <div className="lg:w-1/2">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {data.visionMission.sectionDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom half: white background for the cards */}
        <div className="bg-white pb-20 lg:pb-28">
          <div className="container mx-auto px-4 md:px-10 lg:px-16 relative z-10 -mt-10 lg:-mt-20">
            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="group bg-white rounded-lg shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-[#d1ba8c] flex items-center justify-center group-hover:bg-[#192324] transition-colors duration-500">
                    <Image
                      src="/images/icon-our-vision.svg"
                      alt="Our Vision"
                      width={40}
                      height={40}
                      className="group-hover:brightness-0 group-hover:invert transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#192324] mt-3">
                    {data.visionMission.vision.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed mt-6">
                  {data.visionMission.vision.description}
                </p>
              </div>

              {/* Mission Card */}
              <div className="group bg-white rounded-lg shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-[#d1ba8c] flex items-center justify-center group-hover:bg-[#192324] transition-colors duration-500">
                    <Image
                      src="/images/icon-our-mission.svg"
                      alt="Our Mission"
                      width={40}
                      height={40}
                      className="group-hover:brightness-0 group-hover:invert transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#192324] mt-3">
                    {data.visionMission.mission.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed mt-6">
                  {data.visionMission.mission.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
