import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background Container */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/-JDQX1II-g8?autoplay=1&mute=1&loop=1&playlist=-JDQX1II-g8&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          title="Y & Y Construction Background Video"
        ></iframe>
      </div>

      {/* Dark Overlay gradient matching original */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/30 z-[1]"></div>

      {/* Content */}
      <div className="relative z-[2] h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center">
            <div className="w-full lg:w-10/12">
              <div className="p-5 pl-0 md:pl-5 lg:pt-[100px]">
                {/* Section Title */}
                <div className="mb-10 text-white">
                  <div className="flex items-center mb-4">
                    <span className="w-6 h-1 bg-[#F1D19D] mr-4 shrink-0 inline-block"></span>
                    <h3 className="text-xl md:text-2xl font-bold tracking-wider text-[#F1D19D]">
                      Y & Y Design Build
                    </h3>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-[70px] font-extrabold text-white leading-tight mb-6 tracking-tight max-w-[900px] drop-shadow-lg">
                    Designed with purpose Built with heart
                  </h1>
                  
                  <p className="text-xl md:text-[22px] text-white/90 max-w-[800px] leading-relaxed drop-shadow-md">
                    We specialize in residential and commercial design & construction with lasting value.
                  </p>
                </div>

                {/* Buttons matched to original style */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-10">
                  <Link 
                    href="/services" 
                    className="group relative inline-flex items-center justify-center bg-[#aa8b57] text-white font-bold text-[16px] px-6 py-4 overflow-hidden rounded-md transition-all duration-500 min-w-[220px]"
                  >
                    <span className="absolute top-0 bottom-0 left-[-15%] right-0 w-0 h-[106%] bg-[#192324] -skew-x-[45deg] transition-all duration-400 group-hover:w-full group-hover:skew-x-0 group-hover:left-0 z-0"></span>
                    <span className="relative z-10 pr-6 capitalize">Explore Our Services</span>
                    <Image 
                      src="/images/arrow-white.svg" 
                      alt="Arrow" 
                      width={16} 
                      height={16} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-400 group-hover:translate-x-1" 
                    />
                  </Link>

                  <Link 
                    href="/portfolio" 
                    className="group relative inline-flex items-center justify-center bg-white text-[#aa8b57] font-bold text-[16px] px-6 py-4 overflow-hidden rounded-md transition-all duration-500 min-w-[220px] hover:text-white"
                  >
                    <span className="absolute top-0 bottom-0 left-[-15%] right-0 w-0 h-[106%] bg-[#aa8b57] -skew-x-[45deg] transition-all duration-400 group-hover:w-full group-hover:skew-x-0 group-hover:left-0 z-0"></span>
                    <span className="relative z-10 pr-6 capitalize transition-colors duration-400">Our Portfolio</span>
                    <Image 
                      src="/images/arrow-accent.svg" 
                      alt="Arrow" 
                      width={16} 
                      height={16} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-400 group-hover:translate-x-1 group-hover:invert group-hover:brightness-0" 
                    />
                  </Link>
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
