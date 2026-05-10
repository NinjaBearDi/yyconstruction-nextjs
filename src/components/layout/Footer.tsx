import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className="bg-[#192324] pt-12 pb-6 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* Footer Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-10 mb-10">
            {/* Logo */}
            <div className="mb-8 md:mb-0">
              <Image 
                src="https://jirhzzpaqwwoqshfhawu.supabase.co/storage/v1/object/public/yyconstruction-assets/MainPage/Footer/img_yy-logo.png" 
                alt="Y & Y Construction Logo" 
                width={240} 
                height={70} 
                className="w-auto h-16"
              />
            </div>

            {/* Social Links & WeChat QR */}
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-start pr-4 md:pr-8">
                <h3 className="text-[#F1D19D] font-bold text-xl mb-4">Follow Us</h3>
                <ul className="flex items-center space-x-4">
                  <li>
                    <a href="https://www.youtube.com/channel/UCq-Rzm0mTvOq4PrTB3Cu0Kg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#aa8b57] transition-colors text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/yy.constructiondesign/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#aa8b57] transition-colors text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tiktok.com/@yy.construction?_t=ZS-8zcNdmPU70C&_r=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#aa8b57] transition-colors text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.xiaohongshu.com/user/profile/6654c01a0000000007007033" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#aa8b57] transition-colors">
                      <Image src="/xiaohongshu-2.svg" alt="Xiaohongshu" width={26} height={26} className="w-[26px] h-[26px] object-contain shrink-0"/>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="shrink-0">
                <Image src="/weixin-blue-2.jpg" alt="WeChat QR Code" width={100} height={100} className="w-[100px] h-[100px] object-cover rounded-sm" />
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-15 gap-8 mb-12">
            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h3 className="text-[#F1D19D] font-bold text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-white/80 hover:text-[#aa8b57] transition-colors">Home</Link></li>
                <li><Link href="/portfolio" className="text-white/80 hover:text-[#aa8b57] transition-colors">Portfolio</Link></li>
                <li><Link href="/about-us" className="text-white/80 hover:text-[#aa8b57] transition-colors">About Us</Link></li>
                <li><Link href="/join-us" className="text-white/80 hover:text-[#aa8b57] transition-colors">Join Us</Link></li>
                <li><Link href="/blogs" className="text-white/80 hover:text-[#aa8b57] transition-colors">Blogs</Link></li>
                <li><Link href="/faq" className="text-white/80 hover:text-[#aa8b57] transition-colors">Q & A</Link></li>
                <li><Link href="/contact-us" className="text-white/80 hover:text-[#aa8b57] transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-4">
              <h3 className="text-[#F1D19D] font-bold text-xl mb-6">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/services/residential-design-renovation" className="text-white/80 hover:text-[#aa8b57] transition-colors">Residential Design & Renovation</Link></li>
                <li><Link href="/services/commercial-design-renovation" className="text-white/80 hover:text-[#aa8b57] transition-colors">Commercial Design & Renovation</Link></li>
                <li><Link href="/services/design-drawings-city-approvals" className="text-white/80 hover:text-[#aa8b57] transition-colors">Design Drawings & City Approvals</Link></li>
                <li><Link href="/services/project-management" className="text-white/80 hover:text-[#aa8b57] transition-colors">Project Management</Link></li>
                <li><Link href="/services/tear-down-rebuild" className="text-white/80 hover:text-[#aa8b57] transition-colors">Tear-down & Rebuild</Link></li>
              </ul>
            </div>

            {/* Featured Projects */}
            <div className="lg:col-span-4">
              <h3 className="text-[#F1D19D] font-bold text-xl mb-6">Featured Projects</h3>
              <ul className="space-y-3">
                <li><Link href="/portfolio/big-way-hot-pot-gilmore" className="text-white/80 hover:text-[#aa8b57] transition-colors">Gilmore Big Way</Link></li>
                <li><Link href="/portfolio/langley-big-way" className="text-white/80 hover:text-[#aa8b57] transition-colors">Langley Big Way</Link></li>
                <li><Link href="/portfolio/lougheed-big-way" className="text-white/80 hover:text-[#aa8b57] transition-colors">Lougheed Big Way</Link></li>
                <li><Link href="/portfolio/old-house-renovation" className="text-white/80 hover:text-[#aa8b57] transition-colors">Old House Renovation</Link></li>
                <li><Link href="/portfolio/oui-patisserie-dessert" className="text-white/80 hover:text-[#aa8b57] transition-colors">Oui Patisserie Dessert</Link></li>
                <li><Link href="/portfolio/pet-bubble-bark-dog-grooming" className="text-white/80 hover:text-[#aa8b57] transition-colors">Bubble Bark Dog Grooming</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="lg:col-span-4">
              <h3 className="text-[#F1D19D] font-bold text-xl mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#aa8b57] flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.022-3.498-6.82-2.106 1.039c-1.815.897-3.154 3.203-2.143 8.356 1.157 5.885 5.568 11.233 11.083 12.334 5.378 1.07 8.016-1.127 8.878-3.03l-2.099 1.035z"/></svg>
                  </div>
                  <div className="pt-2 text-white/80 hover:text-[#aa8b57] transition-colors">
                    <a href="tel:+1(604)349-9888">+1 (604) 349-9888</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#aa8b57] flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                  </div>
                  <div className="pt-2 text-white/80 hover:text-[#aa8b57] transition-colors break-all">
                    <a href="mailto:info@yyconstruction.ca">info@yyconstruction.ca</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#aa8b57] flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                  </div>
                  <div className="pt-1.5 text-white/80 leading-relaxed hover:text-[#aa8b57] transition-colors">
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Unit+1+-+2480+Shell+Rd,+Richmond,+British+Columbia,+Canada,+V6X+2P1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Unit 1 - 2480 Shell Rd, Richmond, British Columbia, Canada, V6X 2P1
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between text-white/50 text-sm">
              <p>&copy; {new Date().getFullYear()} Y&Y Construction Ltd. All Rights Reserved.</p>
              <p className="mt-2 md:mt-0">
                Built By :{' '}
                <span>
                  Dylan Z.
                </span>
              </p>
            </div>
            <p className="mt-4 text-center text-xs text-white/40">
              This site is protected by reCAPTCHA and the Google{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#aa8b57] transition-colors"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#aa8b57] transition-colors"
              >
                Terms of Service
              </a>{' '}
              apply.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Free Consultation Button */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center">
        <Link 
          href="/evaluation" 
          className="flex items-center justify-center w-12 h-60 bg-gradient-to-br from-[#aa8b57] to-[#192324] text-white rounded-l-lg shadow-[-5px_5px_15px_rgba(0,0,0,0.2)] hover:pr-2 transition-all duration-300 group"
        >
          <span className="writing-vertical text-[18px] font-semibold tracking-[2px] whitespace-nowrap rotate-180">
            Free Consultation
          </span>
        </Link>
      </div>

      {/* CSS for vertical text + hide reCAPTCHA badge */}
      <style dangerouslySetInnerHTML={{__html: `
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .grecaptcha-badge {
          visibility: hidden !important;
        }
      `}} />
    </>
  );
};

export default Footer;
