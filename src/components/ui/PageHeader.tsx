import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  breadcrumb: string[];
  lang: 'en' | 'zh';
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumb, lang }) => {
  return (
    <section className="relative pt-[240px] pb-[80px] lg:pt-[340px] lg:pb-[110px] -mt-[118px] overflow-hidden bg-[#192324]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[center_25%] bg-no-repeat opacity-70"
        style={{ backgroundImage: "url('https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/page-header-bg.jpg')" }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#192324]/40 z-[1]"></div>

      <div className="container mx-auto px-4 md:px-10 lg:px-16 relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-4xl lg:text-[40px] font-bold text-white mb-4 tracking-tight leading-tight whitespace-nowrap">
            {title}
          </h1>

          {/* Breadcrumb - Center Aligned */}
          <nav className="flex items-center justify-center space-x-3 text-base md:text-xl font-medium text-white">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index === breadcrumb.length - 1 ? (
                  <span className="text-[#aa8b57]">{item}</span>
                ) : (
                  <Link href={index === 0 ? `/${lang}` : `/${lang}/services`} className="hover:text-[#aa8b57] transition-colors">
                    {item}
                  </Link>
                )}
                {index < breadcrumb.length - 1 && (
                  <span className="opacity-60">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;


