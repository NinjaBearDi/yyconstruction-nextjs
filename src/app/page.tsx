import HeroSection from '@/components/home/HeroSection';
import AboutUs from '@/components/home/AboutUs';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import OurServices from '@/components/home/OurServices';
import HowWeWork from '@/components/home/HowWeWork';
import PortfolioPreview from '@/components/home/PortfolioPreview';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutUs />
      <WhyChooseUs />
      <OurServices />
      <HowWeWork />
      <PortfolioPreview />
    </div>
  );
}
