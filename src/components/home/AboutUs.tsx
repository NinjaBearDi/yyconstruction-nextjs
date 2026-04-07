import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedButton from '@/components/ui/AnimatedButton';

const AboutUs = () => {
  return (
    <section 
      className="py-[50px] bg-white text-[#192324] relative z-20 bg-no-repeat bg-[url('/images/section-bg-shape-1.svg')] bg-[position:left_center] bg-contain" 
    >
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
          
          {/* Right: About Us Content (Ordered 1 on mobile) */}
          <div className="xl:pl-8 order-1 xl:order-2">
            {/* Section Header */}
            <SectionHeader 
              title="Company Introduction"
              subtitle={<>With Artisan Spirits,<br /> <span className="text-[#aa8b57]">We Realize Your Vision</span></>}
            />
            
            <div className="space-y-4 text-[#283132] text-base md:text-lg leading-[1.7em] -mt-4 mb-10">
              <p>
                Y&Y Design Build is a full-service firm based in Vancouver,
                specializing in residential and commercial design and
                renovations.
              </p>
              <p>
                We offer a fully integrated process — from concept and
                planning to construction — to bring your vision to life with
                clarity, care, and craftsmanship.
              </p>
            </div>

            {/* Content Body */}
            <div className="relative pt-8 about-us-content-body flex flex-wrap gap-8 xl:gap-12">
              {/* Vertical line for desktop */}
              <div className="absolute hidden xl:block left-[45%] top-0 bottom-0 w-[1px] bg-[#EAF0EC] -translate-x-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 md:gap-10 xl:gap-12 w-full relative">
                {/* Left side info */}
                <div className="relative z-10">
                  <div className="mb-10">
                    <ul className="space-y-4 m-0 p-0 list-none">
                      <li className="flex items-center gap-3 font-medium text-[#192324] text-base md:text-lg">
                        <div className="w-6 h-6 shrink-0 bg-[#aa8b57] text-white rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        creative expertise
                      </li>
                      <li className="flex items-center gap-3 font-medium text-[#192324] text-base md:text-lg">
                        <div className="w-6 h-6 shrink-0 bg-[#aa8b57] text-white rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        client-centered approach
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-start">
                    <AnimatedButton 
                      href="/services" 
                      text="Our Services" 
                      variant="primary"
                    />
                  </div>
                </div>

                {/* Right side contact */}
                <div className="space-y-8 relative z-10">
                  {/* Phone */}
                  <div className="flex items-center group">
                    <div className="w-12 h-12 shrink-0 bg-[#aa8b57] text-white rounded-full flex items-center justify-center mr-4 shadow-sm group-hover:bg-[#192324] transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" /></svg>
                    </div>
                    <div>
                      <p className="text-[#283132] text-xs font-semibold uppercase tracking-widest mb-1 opacity-80">need any help?</p>
                      <h3 className="text-base md:text-lg font-bold text-[#192324]">
                        <a href="tel:+1(604)349-9888">+1 (604) 349-9888</a>
                      </h3>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center group">
                    <div className="w-12 h-12 shrink-0 bg-[#aa8b57] text-white rounded-full flex items-center justify-center mr-4 shadow-sm group-hover:bg-[#192324] transition-all duration-300">
                      <Image 
                        src="https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/favicon.ico" 
                        alt="Y & Y Construction" 
                        width={24} 
                        height={24} 
                        className="invert" 
                      />
                    </div>
                    <div>
                      <p className="text-[#283132] text-xs font-semibold uppercase tracking-widest mb-1 opacity-80">email</p>
                      <h3 className="text-base md:text-lg font-bold text-[#192324] whitespace-nowrap">
                        <a href="mailto:info@yyconstruction.ca">info@yyconstruction.ca</a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Left: About Us Images (Ordered 2 on mobile) */}
          <div className="relative pr-12 md:pr-[60px] xl:pr-[80px] 2xl:pr-[100px] pb-28 md:pb-36 xl:pb-[180px] mr-0 xl:mr-[20px] 2xl:mr-[30px] z-10 mx-auto xl:mx-0 w-full max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-none mb-12 xl:mb-0 order-2 xl:order-1">
            {/* Decorative Background Shape */}
            <div 
              className="absolute left-[-10px] md:left-[60px] bottom-[30px] md:bottom-[40px] w-full h-full -z-10 bg-no-repeat opacity-80 pointer-events-none hidden sm:block" 
              style={{ 
                backgroundImage: "url('/images/about-us-bg-shape.svg')",
                backgroundPosition: "left bottom",
                backgroundSize: "auto"
              }}
            ></div>

            {/* About Image 1 */}
            <div className="relative z-10 w-full aspect-[1/0.76] shadow-2xl rounded-sm overflow-hidden">
              <Image 
                src="https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/about-img-1.jpg" 
                alt="About Y & Y Construction 1" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 35vw"
              />
            </div>

            {/* About Image 2 */}
            <div className="absolute bottom-0 right-0 w-[65%] sm:w-[55%] xl:w-[400px] z-20 shadow-2xl rounded-sm border-4 md:border-8 border-white">
              <div className="relative w-full aspect-[1/0.76] rounded-sm overflow-hidden">
                <Image 
                  src="https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/about-img-2.jpg" 
                  alt="About Y & Y Construction 2" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 640px) 65vw, (max-width: 1280px) 300px, 400px"
                />
              </div>

              {/* Experience Counter Circle */}
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 xl:w-[152px] xl:h-[152px] bg-[#aa8b57] rounded-full border-[4px] xl:border-[6px] border-white flex flex-col items-center justify-center text-white z-30 shadow-xl">
                <h3 className="text-lg sm:text-2xl md:text-3xl xl:text-[34px] font-bold mb-0 xl:mb-1 leading-none text-center w-full">
                  <span className="counter">100</span>%
                </h3>
                <p className="text-[7px] sm:text-[10px] md:text-xs xl:text-[16px] font-semibold leading-[1.4em] capitalize text-center w-full px-2">positive feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
