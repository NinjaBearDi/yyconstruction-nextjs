import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    id: '01',
    title: 'initial consultation',
    description: 'We start with a one-on meeting to understand your vision preferences and requirement.',
    icon: '/images/icon-how-we-work-1.svg',
  },
  {
    id: '02',
    title: 'design planning',
    description: 'This involves selecting materials, and layouts, furnishings, as well as creating 3D renderings.',
    icon: '/images/icon-how-we-work-2.svg',
  },
  {
    id: '03',
    title: 'project execution',
    description: 'With the design plans in this place, we manage and coordinate all aspects of the projects.',
    icon: '/images/icon-how-we-work-3.svg',
  },
  {
    id: '04',
    title: 'final review',
    description: 'After completing project we conduct a thorough walkthrough with you to review the space.',
    icon: '/images/icon-how-we-work-4.svg',
  },
];

const clients = [
  { name: 'Big Way Hot Pot', logo: '/images/client-big-way.jpg' },
  { name: 'Datang Hot Pot', logo: '/images/client-datang.jpg' },
  { name: 'Gyubee', logo: '/images/client-gyubee.avif' },
  { name: 'Hikvision', logo: '/images/client-hikvision.webp' },
  { name: 'Kinton Ramen', logo: '/images/client-kinton.svg' },
  { name: 'Myth Grill', logo: '/images/client-myth.jpg' },
];

const HowWeWork = () => {
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <SectionHeader 
            title="how we work"
            subtitle={<>From concept to completion in <br className="hidden md:block" /><span className="text-[#aa8b57] italic">our work</span></>}
            light={true}
            className="lg:max-w-[60%] !mb-0 [&>h2]:!mb-0"
          />
          <div className="lg:max-w-[35%] lg:mb-2">
            <p className="text-white/80 text-base md:text-lg leading-[1.7em]">
              Our comprehensive approach guides you through each phase of the
              design process, from initial brainstorming and conceptualization.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 mb-20">
          {steps.map((step) => (
            <div key={step.id} className="group relative">
              {/* Icon Box */}
              <div className="mb-8 relative inline-block">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-[#aa8b57]">
                  <Image
                    src={step.icon}
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
                  {step.id}. {step.title}
                </h3>
                <p className="text-white/60 text-base leading-[1.7em]">
                  {step.description}
                </p>
              </div>

              {/* Hover highlight */}
              <div className="absolute -inset-4 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-sm"></div>
            </div>
          ))}
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
