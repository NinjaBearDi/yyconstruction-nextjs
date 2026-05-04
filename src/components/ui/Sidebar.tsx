import React from 'react';
import Link from 'next/link';

interface ServiceLink {
  title: string;
  href: string;
}

interface SidebarLabels {
  servicesTitle: string;
  cta: {
    title: string;
    description: string;
  };
}

interface SidebarProps {
  lang: string;
  labels: SidebarLabels;
  services: ServiceLink[];
  activeServiceIndex: number;
}

const Sidebar: React.FC<SidebarProps> = ({ lang, labels, services, activeServiceIndex }) => {
  return (
    <div className="sticky top-32 space-y-10">
      {/* Services List */}
      <div className="bg-[#5D6667] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-8 border-b-2 border-white/20 pb-4">
          {labels.servicesTitle}
        </h3>
        <ul className="space-y-4">
          {services.map((service, idx) => (
            <li key={idx}>
              <Link 
                href={`/${lang}${service.href}`}
                className={`flex items-center justify-between group p-4 rounded-xl transition-all duration-300 border border-white/5 hover:bg-[#aa8b57] hover:border-[#aa8b57] hover:text-white hover:shadow-lg ${
                  idx === activeServiceIndex ? 'text-[#aa8b57]' : 'text-white'
                }`}
              >
                <span className="font-bold">{service.title}</span>
                <svg className={`w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white ${idx === activeServiceIndex ? 'text-[#aa8b57]' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Box */}
      <div className="relative overflow-hidden rounded-2xl bg-[#5D6667] p-10 text-white group border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-[#aa8b57] opacity-20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight leading-tight">
            {labels.cta.title}
          </h3>
          <p className="text-white/70 mb-8 leading-relaxed">
            {labels.cta.description}
          </p>
          <div className="space-y-4">
            <a href="tel:+1(604)349-9888" className="flex items-center space-x-4 hover:text-[#F1D19D] transition-colors group/contact">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/contact:bg-[#aa8b57]/30 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <span className="font-bold">+1 (604) 349-9888</span>
            </a>
            <a href="mailto:info@yyconstruction.ca" className="flex items-center space-x-4 hover:text-[#F1D19D] transition-colors group/contact">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/contact:bg-[#aa8b57]/30 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="font-bold">info@yyconstruction.ca</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
