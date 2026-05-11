import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import PageHeader from '@/components/ui/PageHeader';
import JoinUsForm from './JoinUsForm';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'zh' ? '加入我们' : 'Join Us',
    description: lang === 'zh'
      ? '加入右岩建筑团队，我们正在招聘设计师、项目经理助理、工地主管等职位。'
      : 'Join the Y&Y Construction team. We are hiring interior designers, PM assistants, and site supervisors.',
  };
}

export default async function JoinUsPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = dict.joinUs;

  return (
    <main className="bg-white">
      {/* Page Banner */}
      <PageHeader title={data.header.title} breadcrumb={data.header.breadcrumb} lang={lang} />

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column - Form (8/12) */}
            <div className="lg:w-8/12">
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                <JoinUsForm formData={data.form} />
              </div>
            </div>

            {/* Right Column - Contact Info (4/12) */}
            <div className="lg:w-4/12 space-y-8">
              {/* Phone */}
              <ContactInfoItem
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
                label={data.contact.phone.label}
                href={`tel:+16043499888`}
                value={data.contact.phone.value}
              />

              {/* Email */}
              <ContactInfoItem
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
                label={data.contact.email.label}
                href={`mailto:${data.contact.email.value}`}
                value={data.contact.email.value}
              />

              {/* Address */}
              <ContactInfoItem
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                label={data.contact.address.label}
                value={data.contact.address.value}
              />

              {/* WeChat */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 shrink-0 rounded-full bg-[#aa8b57]/10 flex items-center justify-center text-[#aa8b57]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.87 13.37c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#192324] mb-3">
                    {data.contact.wechat.label}
                  </h4>
                  <Image
                    src="/images/weixin-blue-2.jpg"
                    alt="WeChat QR Code"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactInfoItem({
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
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 shrink-0 rounded-full bg-[#aa8b57]/10 flex items-center justify-center text-[#aa8b57]">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-[#192324] mb-1">{label}</h4>
        {href ? (
          <a
            href={href}
            className="text-gray-600 hover:text-[#aa8b57] transition-colors duration-300"
          >
            {value}
          </a>
        ) : (
          <p className="text-gray-600">{value}</p>
        )}
      </div>
    </div>
  );
}
