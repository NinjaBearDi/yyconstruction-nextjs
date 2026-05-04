import { getDictionary } from '@/lib/get-dictionary';
import HeroSection from '@/components/home/HeroSection';
import AboutUs from '@/components/home/AboutUs';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import OurServices from '@/components/home/OurServices';
import HowWeWork from '@/components/home/HowWeWork';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import { getProjects } from '@/lib/payload/queries';

export default async function HomePage({
  params
}: {
  params: Promise<{ lang: 'en' | 'zh' }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const projects = await getProjects();

  return (
    <div className="flex flex-col">
      <HeroSection dict={dict.hero} />
      <AboutUs dict={dict.about} />
      <WhyChooseUs dict={dict.whyChooseUs} />
      <OurServices dict={dict.services} />
      <HowWeWork dict={dict.howWeWork} />
      <PortfolioPreview projects={projects} dict={dict.portfolio} lang={lang} />
    </div>
  );
}
