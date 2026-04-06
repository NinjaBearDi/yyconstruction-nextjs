import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: "Residential Design & Renovation",
    description: "Custom design and renovation for houses, apartments, and townhomes. Kitchen and bathroom Design & Renovation. Finishes & Furniture selection and Interior design consultation.",
    image: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/service-1.jpg",
    link: "/residential-design-renovation"
  },
  {
    title: "Commercial Design & Renovation",
    description: "Full-service design / renovation & management for restaurants, offices, and retail spaces. Brand visual image w / Interior design, Space planning. Lighting, plumbing, HVAC, fire safety.",
    image: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/service-2.jpg",
    link: "/commercial-design-renovation"
  },
  {
    title: "Design Drawings & City Approvals",
    description: "Full sets of architectural and interior construction drawings. Assistance with permit applications, change requests, and city approvals.",
    image: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/service-3.jpg",
    link: "/design-drawings-city-approvals"
  },
  {
    title: "Project Management",
    description: "Project scheduling and progress monitoring. Budget planning and material procurement. On-site coordination and quality control throughout construction.",
    image: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/service-7.jpg",
    link: "/project-management"
  },
  {
    title: "Tear-down & Rebuild",
    description: "Demolition of outdated properties and full-scale rebuild. Architectural planning, permitting, and structural optimization. Ground-up construction tailored for personal or investment needs.",
    image: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/service-8.jpg",
    link: "/tear-down-rebuild"
  }
];

const OurServices = () => {
  return (
    <section className="py-12 lg:py-24 bg-white text-[#192324] relative overflow-hidden">
      {/* Background shape decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full pointer-events-none opacity-30 z-0 scale-110">
         <Image 
          src="/images/section-bg-shape-1.svg" 
          alt="" 
          fill 
          className="object-contain object-left"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 lg:mb-20 items-end">
          <div>
            <div className="flex items-center mb-4">
              <span className="w-12 h-0.5 bg-[#aa8b57] mr-4 shrink-0 inline-block"></span>
              <h3 className="text-xl font-bold uppercase tracking-wider text-[#aa8b57]">
                our services
              </h3>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#192324] leading-tight tracking-tight">
              Innovative design services for{' '}
              <span className="text-[#aa8b57]">every need</span>
            </h2>
          </div>
          <div className="lg:pl-12 lg:pb-2">
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
              We offer a range of bespoke interior design services tailored to your unique needs. From concept development to final installation.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden bg-gray-100 rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl flex flex-col h-full"
            >
              {/* Service Image Container */}
              <div className="relative aspect-[1/1.36] overflow-hidden w-full">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#192324] via-[#192324]/40 to-transparent z-10 opacity-70 group-hover:opacity-85 transition-opacity duration-500"></div>
                
                {/* Arrow Button (Absolute within image container) */}
                <Link 
                  href={service.link}
                  className="absolute top-6 right-6 lg:top-8 lg:right-8 w-12 h-12 lg:w-14 lg:h-14 bg-[#aa8b57] rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:bg-[#192324] group/btn shadow-lg"
                >
                  <div className="relative w-5 h-5 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-500">
                    <Image 
                      src="/images/arrow-white.svg" 
                      alt="Arrow" 
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>

                {/* Content (Absolute overlaying the image) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 z-20">
                  <h3 className="text-white text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-[#aa8b57]">
                    <Link href={service.link}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed transition-colors duration-300 group-hover:text-white">
                    {service.description}
                  </p>
                  <Link 
                    href={service.link}
                    className="inline-flex items-center text-white text-xs lg:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 group-hover:text-[#aa8b57]"
                  >
                    <span className="border-b border-white/50 pb-1 group-hover:border-[#aa8b57] transition-colors">Learn More</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
