"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '#',
      dropdownWidth: 'min-w-[350px]',
      dropdownPosition: '-left-12',
      dropdown: [
        { name: 'Residential Design & Renovation', href: '/residential-design-renovation' },
        { name: 'Commercial Design & Renovation', href: '/commercial-design-renovation' },
        { name: 'Design Drawings & City Approvals', href: '/design-drawings-city-approvals' },
        { name: 'Project Management', href: '/project-management' },
        { name: 'Tear-down & Rebuild', href: '/tear-down-rebuild' },
      ]
    },
    { name: 'Portfolio', href: '/portfolio' },
    {
      name: 'About Us',
      href: '#',
      dropdownWidth: 'min-w-[160px]',
      dropdownPosition: 'left-0',
      dropdown: [
        { name: 'About Us', href: '/about-us' },
        { name: 'Our Team', href: '/our-team' },
        { name: 'Join Us', href: '/join-us' },
      ]
    },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Q & A', href: '/faq' },
  ];

  const languages = [
    { name: 'English', code: 'en', flag: 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/languages/en.png', href: '/' },
    { name: '简体中文', code: 'zh', flag: 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/languages/zh.png', href: '/zh' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${isScrolled ? 'bg-[#192324]/80 backdrop-blur-lg py-3 lg:py-4 border-b border-white/10 shadow-xl' : 'bg-transparent py-5 lg:py-7'}`}>
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between flex-nowrap">
          {/* Logo */}
          <Link href="/" className="relative transition-transform hover:scale-105 duration-300 shrink-0">
            <Image 
              src="https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/yy-logo.png" 
              alt="Y & Y Construction Logo" 
              width={240} 
              height={70} 
              className="w-auto h-10 md:h-12 lg:h-14 xl:h-18"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center flex-nowrap space-x-0 xl:space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group px-1.5 xl:px-3"
                onMouseEnter={() => !link.dropdown ? null : setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <>
                    <button className="flex items-center text-[#F1D19D] group-hover:text-[#aa8b57] transition-colors text-[15px] xl:text-[18px] font-medium py-2 whitespace-nowrap">
                      {link.name}
                      <svg className="ml-1 w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className={`absolute top-full ${link.dropdownPosition || 'left-0'} pt-2 transition-all duration-300 z-[100] ${activeDropdown === link.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
                      <div className={`bg-[#192324] border border-white/10 ${link.dropdownWidth || 'min-w-[200px]'} shadow-2xl rounded-sm overflow-hidden py-2`}>
                        {link.dropdown.map((sub) => (
                          <Link 
                            key={sub.name} 
                            href={sub.href} 
                            className="block px-6 py-3 text-[#F1D19D] hover:bg-[#aa8b57] hover:text-white transition-all text-[16px] border-b border-white/5 last:border-0 whitespace-nowrap"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    href={link.href} 
                    className={`text-[#F1D19D] hover:text-[#aa8b57] transition-colors text-[15px] xl:text-[18px] font-medium py-2 whitespace-nowrap ${pathname === link.href ? 'text-[#aa8b57]' : ''}`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Language Switcher Desktop */}
            <div 
              className="relative group px-2 xl:px-3 ml-1 xl:ml-4"
              onMouseEnter={() => setActiveDropdown('lang')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center text-[#F1D19D] group-hover:text-[#aa8b57] transition-colors text-[14px] xl:text-[16px] py-2 border-l border-white/20 pl-4 xl:pl-6 whitespace-nowrap">
                <img src={languages[0].flag} alt="English" className="w-4 h-3 xl:w-5 xl:h-3.5 mr-1.5 xl:mr-2 object-cover" />
                <span>EN</span>
                <svg className="ml-1 w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`absolute top-full right-0 pt-2 transition-all duration-300 z-[100] ${activeDropdown === 'lang' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
                <div className="bg-[#192324] border border-white/10 min-w-[160px] shadow-2xl rounded-sm py-2">
                  {languages.map((lang) => (
                    <Link 
                      key={lang.code} 
                      href={lang.href} 
                      className="flex items-center px-6 py-3 text-[#F1D19D] hover:bg-[#aa8b57] transition-all text-[15px]"
                    >
                      <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 mr-3 object-cover" />
                      {lang.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Button Desktop (Now inside the desktop menu flex container for better alignment) */}
            <div className="ml-2 xl:ml-6 shrink-0">
              <Link 
                href="/contact-us" 
                className="relative inline-flex items-center group bg-[#aa8b57] text-white px-4 xl:px-8 py-2.5 xl:py-3.5 overflow-hidden rounded-md transition-all duration-500 whitespace-nowrap"
              >
                <span className="absolute left-0 w-0 h-full bg-[#192324] transition-all duration-500 group-hover:w-full"></span>
                <span className="relative z-10 font-bold uppercase tracking-widest text-[12px] xl:text-[15px]">Contact Us</span>
                <svg className="relative z-10 ml-2 w-3.5 h-3.5 xl:w-4 xl:h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile Toggler - Now hidden from lg breakpoint */}
          <button 
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 text-white focus:outline-none relative z-[10001]" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <div className="flex flex-col items-center justify-center w-8 h-6">
                <span className={`block w-8 h-0.5 bg-white transition-all duration-300 mb-1.5`}></span>
                <span className={`block w-8 h-0.5 bg-white transition-all duration-300 mb-1.5`}></span>
                <span className={`block w-8 h-0.5 bg-white transition-all duration-300`}></span>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#192324]/98 z-[9998] transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
      >
        <div className="flex flex-col h-full overflow-y-auto p-8 pt-24">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col">
                {link.dropdown ? (
                  <>
                    <button 
                      className="flex justify-between items-center text-[#F1D19D] text-xl py-4 border-b border-white/10 uppercase tracking-wide font-medium"
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                    >
                      {link.name}
                      <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-[#aa8b57]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ${activeDropdown === link.name ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 flex flex-col space-y-5 border-l border-[#aa8b57]/30 ml-1">
                        {link.dropdown.map((sub) => (
                          <Link key={sub.name} href={sub.href} className="text-white/80 hover:text-[#aa8b57] text-lg transition-colors">{sub.name}</Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={link.href} className="text-[#F1D19D] text-xl py-4 border-b border-white/10 uppercase tracking-wide font-medium hover:text-[#aa8b57] transition-colors">{link.name}</Link>
                )}
              </div>
            ))}

            {/* Language Switcher Mobile */}
            <div className="flex flex-col mt-4">
              <button 
                className="flex justify-between items-center text-[#F1D19D] text-xl py-4 border-b border-white/10 uppercase tracking-wide font-medium"
                onClick={() => setActiveDropdown(activeDropdown === 'lang' ? null : 'lang')}
              >
                <div className="flex items-center">
                  <img src={languages[0].flag} alt="EN" className="w-6 h-4 mr-3 object-cover shadow-sm" />
                  Language
                </div>
                <svg className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === 'lang' ? 'rotate-180 text-[#aa8b57]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'lang' && (
                <div className="pl-4 py-4 flex flex-col space-y-5 border-l border-[#aa8b57]/30 ml-1">
                  {languages.map((lang) => (
                    <Link key={lang.code} href={lang.href} className="flex items-center text-white/80 hover:text-[#aa8b57] text-lg transition-colors">
                      <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 mr-3 object-cover shadow-sm" />
                      {lang.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 pb-10">
            <Link href="/contact-us" className="flex items-center justify-center w-full bg-[#aa8b57] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#8e744a] rounded-sm transition-all shadow-lg">
              Contact Us
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
