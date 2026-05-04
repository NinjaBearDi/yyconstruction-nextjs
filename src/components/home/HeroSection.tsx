import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface HeroSectionProps {
  dict: {
    title: string;
    titleAccent: string;
    subtitle: string;
    explore: string;
    portfolio: string;
  };
}

const HeroSection = ({ dict }: HeroSectionProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background Container */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/-JDQX1II-g8?autoplay=1&mute=1&loop=1&playlist=-JDQX1II-g8&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
          title="Y & Y Construction Background Video"
        ></iframe>
      </div>

      {/* Dark Overlay gradient matching original */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 z-[1]"></div>

      {/* Content */}
      <div className="relative z-[2] h-full flex items-center">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex items-center">
            <div className="w-full lg:w-10/12">
              <div className="p-5 pl-0 md:pl-5 lg:pt-[50px]">
                {/* Section Title */}
                <div className="mb-10 text-white">
                  <div className="flex items-center mb-6">
                    <span className="w-8 h-1 bg-[#F1D19D] mr-4 shrink-0 inline-block"></span>
                    <h3 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-[#F1D19D] uppercase">
                      Y & Y Design Build
                    </h3>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-white leading-[1.1] mb-8 tracking-tight max-w-[900px] drop-shadow-2xl">
                    {dict.title} <br />
                    <span className="text-[#aa8b57]">{dict.titleAccent}</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 max-w-[700px] leading-relaxed drop-shadow-lg font-medium">
                    {dict.subtitle}
                  </p>
                </div>

                {/* Buttons using UI component */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-8 mt-12">
                  <AnimatedButton 
                    href="/services" 
                    text={dict.explore} 
                    variant="primary" 
                    className="!min-w-[240px]"
                  />
                  <AnimatedButton 
                    href="/portfolio" 
                    text={dict.portfolio} 
                    variant="white" 
                    className="!min-w-[240px]"
                  />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
