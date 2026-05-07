import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';

const serviceLinksAndImages = [
  {
    image: 'https://jirhzzpaqwwoqshfhawu.supabase.co/storage/v1/object/public/yyconstruction-assets/MainPage/OurServices/img_service-1.jpg',
    link: '/services/residential-design-renovation',
  },
  {
    image: 'https://jirhzzpaqwwoqshfhawu.supabase.co/storage/v1/object/public/yyconstruction-assets/MainPage/OurServices/img_service-2.jpg',
    link: '/services/commercial-design-renovation',
  },
  {
    image: 'https://jirhzzpaqwwoqshfhawu.supabase.co/storage/v1/object/public/yyconstruction-assets/MainPage/OurServices/img_service-3.jpg',
    link: '/services/design-drawings-city-approvals',
  },
  {
    image: 'https://jirhzzpaqwwoqshfhawu.supabase.co/storage/v1/object/public/yyconstruction-assets/MainPage/OurServices/img_service-4.jpg',
    link: '/services/project-management',
  },
  {
    image: 'https://jirhzzpaqwwoqshfhawu.supabase.co/storage/v1/object/public/yyconstruction-assets/MainPage/OurServices/img_service-5.jpg',
    link: '/services/tear-down-rebuild',
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.services;

  const breadcrumbTitle = lang === 'zh' ? '我们的服务' : 'Services';
  const breadcrumb: (string | { label: string; href: string })[] = [
    { label: lang === 'zh' ? '首页' : 'Home', href: `/${lang}` },
    breadcrumbTitle,
  ];

  return (
    <main className="bg-white">
      <PageHeader title={breadcrumbTitle} breadcrumb={breadcrumb} lang={lang} />

      <section className="py-12 lg:py-24 bg-white text-[#192324] relative overflow-hidden">
        {/* Background shape */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full pointer-events-none opacity-30 z-0 scale-110">
          <Image
            src="/images/section-bg-shape-1.svg"
            alt=""
            fill
            className="object-contain object-left"
          />
        </div>

        <div className="container mx-auto px-4 md:px-10 lg:px-16 relative z-10">
          {/* Section Title */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 lg:mb-20 items-start">
            <SectionHeader
              title={data.title}
              subtitle={
                <>
                  {data.subtitle} <span className="text-[#aa8b57]">{data.subtitleAccent}</span>
                </>
              }
              className="!mb-0 [&>h2]:!mb-0"
            />
            <div className="lg:pl-12 lg:pt-[52px]">
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
                {data.description}
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.items.map(
              (
                service: { title: string; description: string },
                index: number,
              ) => {
                const meta = serviceLinksAndImages[index];
                if (!meta) return null;
                const href = `/${lang}${meta.link}`;
                return (
                  <article
                    key={index}
                    className="group relative overflow-hidden bg-gray-100 rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl flex flex-col h-full"
                  >
                    <div className="relative aspect-[1/1.36] overflow-hidden w-full">
                      <Image
                        src={meta.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#192324] via-[#192324]/40 to-transparent z-10 opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

                      {/* Arrow Button */}
                      <Link
                        href={href}
                        aria-label={service.title}
                        className="absolute top-6 right-6 lg:top-8 lg:right-8 w-12 h-12 lg:w-14 lg:h-14 bg-[#aa8b57] rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:bg-[#192324] group/btn shadow-lg"
                      >
                        <div className="relative w-5 h-5 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-500">
                          <Image src="/images/arrow-white.svg" alt="" fill className="object-contain" />
                        </div>
                      </Link>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 z-20">
                        <h3 className="text-white text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[#aa8b57]">
                          <Link href={href}>{service.title}</Link>
                        </h3>
                        <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed transition-colors duration-300 group-hover:text-white">
                          {service.description}
                        </p>
                        <Link
                          href={href}
                          className="inline-flex items-center text-white text-xs lg:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 group-hover:text-[#aa8b57]"
                        >
                          <span className="border-b border-white/50 pb-1 group-hover:border-[#aa8b57] transition-colors">
                            {data.learnMore}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
