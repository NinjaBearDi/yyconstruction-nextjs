import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

const stepIcons = [
  '/images/icon-how-we-work-1.svg',
  '/images/icon-how-we-work-2.svg',
  '/images/icon-how-we-work-3.svg',
  '/images/icon-how-we-work-4.svg',
];

const clients = [
  { name: 'Big Way Hot Pot', logo: '/images/client-big-way.jpg' },
  { name: 'Datang Hot Pot', logo: '/images/client-datang.jpg' },
  { name: 'Gyubee', logo: '/images/client-gyubee.avif' },
  { name: 'Hikvision', logo: '/images/client-hikvision.webp' },
  { name: 'Kinton Ramen', logo: '/images/client-kinton.svg' },
  { name: 'Myth Grill', logo: '/images/client-myth.jpg' },
];

interface StepItem {
  title: string;
  description: string;
}

interface HowWeWorkProps {
  dict: {
    title: string;
    subtitle: string;
    subtitleAccent: string;
    description: string;
    steps: StepItem[];
  };
}

const HowWeWork = ({ dict }: HowWeWorkProps) => {
  return (
    <section className="pt-[80px] pb-[40px] md:pt-[100px] md:pb-[50px] bg-[#192324] relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none"
        style={{ 
          backgroundImage: "url('/images/section-bg-shape-1.svg')",
          backgroundPosition: "right top",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 lg:mb-20 items-start">
          <SectionHeader 
            title={dict.title}
            subtitle={<>{dict.subtitle} <span className="text-[#aa8b57] italic">{dict.subtitleAccent}</span></>}
            light={true}
            className="!mb-0 [&>h2]:!mb-0"
          />
          <div className="lg:pl-12 lg:pt-[52px]">
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl">
              {dict.description}
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 mb-20">
          {dict.steps.map((step, index) => {
            const id = `0${index + 1}`;
            return (
              <div key={id} className="group relative">
                {/* Icon Box */}
                <div className="mb-8 relative inline-block">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-[#aa8b57]">
                    <Image
                      src={stepIcons[index]}
                      alt={step.title}
                      width={50}
                      height={50}
                      className="brightness-0 invert transition-all duration-500 group-hover:scale-110 w-auto h-auto"
                    />
                  </div>
                  {/* Connector line for desktop */}
                  <div className="hidden lg:block absolute top-10 left-full w-full h-[1px] bg-white/10 -z-10 group-last:hidden"></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white capitalize leading-tight group-hover:text-[#aa8b57] transition-colors duration-300">
                    {id}. {step.title}
                  </h3>
                  <p className="text-white/60 text-base leading-[1.7em]">
                    {step.description}
                  </p>
                </div>

                {/* Hover highlight */}
                <div className="absolute -inset-4 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-sm"></div>
              </div>
            );
          })}
        </div>

        {/* Client Logos Slider */}
        <div className="pt-10 border-t border-white/10">
          <div className="overflow-hidden group/marquee">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {/* Double the logos for infinite effect */}
              {[...clients, ...clients].map((client, idx) => (
                <div 
                  key={`${client.name}-${idx}`} 
                  className="inline-flex items-center justify-center px-6 md:px-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  <div className="relative h-8 md:h-12 w-24 md:w-36">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      sizes="(max-width: 768px) 100px, 150px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
