import HeroSection from '@/components/home/HeroSection';
import AboutUs from '@/components/home/AboutUs';
import OurServices from '@/components/home/OurServices';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutUs />
      <WhyChooseUs />
      <OurServices />
    </div>
  );
}
