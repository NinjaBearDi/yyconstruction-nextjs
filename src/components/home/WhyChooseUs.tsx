import React from 'react';
import Image from 'next/image';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Integrated Service:",
      description: "Seamless collaboration between design and construction for smoother communication.",
      icon: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/icon-why-choose-1.svg"
    },
    {
      id: 2,
      title: "Experienced Team:",
      description: "Professionals with deep expertise in residential and commercial renovations.",
      icon: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/icon-why-choose-2.svg"
    },
    {
      id: 3,
      title: "Transparent Process:",
      description: "Detailed budgeting and timelines, with no hidden fees.",
      icon: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/icon-why-choose-3.svg"
    },
    {
      id: 4,
      title: "Client-Centered:",
      description: "Bilingual service (English & Chinese) with fast response and clear communication.",
      icon: "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/icon-why-choose-3.svg"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#192324] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <Image 
          src="/images/section-bg-shape-1.svg" 
          alt="" 
          fill 
          className="object-contain object-right"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 2xl:grid-cols-12 gap-12 md:gap-16 2xl:gap-20 items-center">
          
          {/* Top/Left: Content */}
          <div className="2xl:col-span-5">
            <div className="mb-10 md:mb-12 text-center 2xl:text-left">
              <div className="flex items-center mb-4 justify-center 2xl:justify-start">
                <span className="w-12 h-0.5 bg-[#aa8b57] mr-4 shrink-0 inline-block"></span>
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-[#aa8b57]">
                  Why Choose Us
                </h3>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Provide <span className="text-[#aa8b57]">comprehensive spatial solutions</span>
              </h2>
              
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-4xl mx-auto 2xl:mx-0">
                From concept to completion, discover how we bring your vision to life with innovation, collaboration, and expert craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-1 gap-x-10 gap-y-2 md:gap-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="group flex items-start p-3 md:p-4 border-b border-white/10 last:border-0 2xl:last:border-b md:[&:nth-last-child(2)]:border-0 2xl:[&:nth-last-child(2)]:border-b hover:border-[#aa8b57]/30 transition-colors">
                  <div className="relative w-10 h-10 md:w-14 md:h-14 shrink-0 bg-white/10 rounded-full flex items-center justify-center mr-4 md:mr-5 overflow-hidden transition-all duration-300 group-hover:bg-[#aa8b57]">
                    <Image 
                      src={feature.icon} 
                      alt="" 
                      width={24} 
                      height={24} 
                      className="relative z-10 transition-all duration-300 brightness-0 invert scale-75 md:scale-100"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 group-hover:text-[#aa8b57] transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom/Right: Images (4 Images Layout) */}
          <div className="2xl:col-span-7 w-full max-w-5xl mx-auto 2xl:max-w-none">
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 relative">
              {/* Column 1 */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8 pt-8 md:pt-12">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                  <Image 
                    src="https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/why-choose-img-1.jpg" 
                    alt="Work in progress 1" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1536px) 45vw, 35vw"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                  <Image 
                    src="https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/why-choose-img-4.jpg" 
                    alt="Finished project 2" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1536px) 45vw, 35vw"
                  />
                </div>
              </div>
              
              {/* Column 2 */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8 pb-8 md:pb-12">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                  <Image 
                    src="https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/why-choose-img-3.jpg" 
                    alt="Finished project 1" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1536px) 45vw, 35vw"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                  <Image 
                    src="https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/why-choose-img-2.jpg" 
                    alt="Interior detail" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1536px) 45vw, 35vw"
                  />
                </div>
                
                {/* Experience Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#aa8b57] w-28 h-28 md:w-36 md:h-36 lg:w-48 xl:w-56 xl:h-56 rounded-full shadow-2xl flex flex-col items-center justify-center z-20 text-center border-4 border-[#192324] px-2 md:px-4">
                  <p className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-1 leading-none">15+</p>
                  <p className="text-[7px] md:text-[9px] lg:text-xs xl:text-sm font-semibold uppercase tracking-wider text-white/90 leading-tight">Years of Building Excellence</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
