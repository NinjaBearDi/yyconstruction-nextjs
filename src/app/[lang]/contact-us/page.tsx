import React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import ContactForm from './ContactForm';

export default async function ContactUsPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.contactUs;

  return (
    <main className="bg-white">
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      {/* Section Title + Contact Info Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h3 className="text-[#aa8b57] text-sm md:text-base font-semibold uppercase tracking-widest mb-3">
              {data.sectionTitle}
            </h3>
            <h2 className="text-2xl md:text-4xl font-bold text-[#192324] mb-4">
              {data.sectionSubtitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {data.sectionDescription}
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ContactInfoCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
              label={data.info.phone.label}
              value={data.info.phone.value}
              href="tel:+16043499888"
            />
            <ContactInfoCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
              label={data.info.email.label}
              value={data.info.email.value}
              href="mailto:info@yyconstruction.ca"
            />
            <ContactInfoCard
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
              label={data.info.address.label}
              value={data.info.address.value}
            />
          </div>

          {/* Contact Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
              <h3 className="text-xl font-bold text-[#192324] mb-1">
                {data.form.title}
              </h3>
              <h4 className="text-2xl md:text-3xl font-bold text-[#192324] mb-3">
                {data.form.subtitle}
              </h4>
              <p className="text-gray-500 text-sm mb-8">
                {data.form.note}
              </p>
              <ContactForm formData={data.form} />
            </div>

            {/* Right - Map */}
            <div className="rounded-2xl overflow-hidden shadow-xl min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1388.4230653372565!2d-123.10274061514004!3d49.195501761119246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867500092b079d%3A0xf243bc48bf2b489!2zWSZZIENvbnN0cnVjdGlvbuWPs-WyqeW7uuetkQ!5e0!3m2!1sen!2sca!4v1750730668289!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Y&Y Construction Location"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactInfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div className="w-14 h-14 shrink-0 rounded-full bg-[#aa8b57]/10 flex items-center justify-center text-[#aa8b57] group-hover:bg-[#aa8b57] group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-base font-bold text-[#192324] mb-1">{label}</h4>
        {href ? (
          <a href={href} className="text-gray-600 hover:text-[#aa8b57] transition-colors duration-300 text-sm">
            {value}
          </a>
        ) : (
          <p className="text-gray-600 text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}
