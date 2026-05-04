import Image from 'next/image';
import { getDictionary } from '@/lib/get-dictionary';
import { getOurTeamPage } from '@/lib/payload/global-queries';
import type { OurTeamGroup, OurTeamMember } from '@/lib/payload/global-queries';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';

const S3_BASE = 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca';

export default async function OurTeamPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const fallback = {
    ...dict.ourTeam,
    groups: dict.ourTeam.groups.map((g: { name: string; members: { name: string; title: string; image: string }[] }) => ({
      ...g,
      members: g.members.map((m) => ({
        ...m,
        image: `${S3_BASE}/${m.image}`,
      })),
    })),
  };
  const data = await getOurTeamPage(lang, fallback);

  return (
    <main className="bg-white">
      {/* Page Banner */}
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      {/* Intro Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <div className="lg:w-5/12">
              <SectionHeader
                title={data.sectionTitle}
                subtitle={
                  <>
                    {data.subtitle}
                    {data.subtitleAccent && (
                      <span className="text-[#aa8b57]">{data.subtitleAccent}</span>
                    )}
                  </>
                }
              />
            </div>
            <div className="lg:w-7/12">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          {/* Team Groups */}
          <div className="mt-16 lg:mt-20 space-y-16 lg:space-y-20">
            {data.groups.map((group: OurTeamGroup, gIdx: number) => {
              const isLargeGroup = group.members.length > 3;

              return (
                <div key={gIdx}>
                  {/* Group Title */}
                  <div className="flex items-center mb-8">
                    <span className="w-10 h-0.5 bg-[#aa8b57] mr-4 shrink-0"></span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#192324] capitalize">
                      {group.name}
                    </h3>
                  </div>

                  {/* Members Grid */}
                  <div
                    className={
                      isLargeGroup
                        ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6'
                        : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-3xl'
                    }
                  >
                    {group.members.map((member: OurTeamMember, mIdx: number) => (
                      <div
                        key={mIdx}
                        className="group"
                      >
                        {/* Photo */}
                        <div className="relative overflow-hidden rounded-xl mb-4">
                          <div className="aspect-[1/1.11]">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes={
                                isLargeGroup
                                  ? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw'
                                  : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                              }
                            />
                          </div>
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-[#192324]/0 group-hover:bg-[#192324]/20 transition-colors duration-500" />
                        </div>

                        {/* Name & Title */}
                        <div className="text-center">
                          <h4 className="text-base md:text-lg font-bold text-[#192324] capitalize mb-1">
                            {member.name}
                          </h4>
                          <p className="text-sm text-gray-500 capitalize">
                            {member.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
