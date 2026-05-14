import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang;
  const isZh = lang === 'zh';
  const title = isZh ? "右岩建筑 Y&Y Construction" : "Y & Y Construction";
  const description = isZh
    ? "顶尖空间规划与一级施工品质的完美融合。"
    : "Expert space planning meets top-tier construction quality in Vancouver.";
  return {
    metadataBase: new URL('https://yyconstruction.ca'),
    title: {
      default: title,
      template: `%s`,
    },
    description,
    keywords: isZh
      ? ['温哥华装修', '商业装修', '住宅装修', '设计施工', '右岩建筑', 'Vancouver renovation']
      : ['Vancouver renovation', 'commercial renovation', 'residential design', 'construction Vancouver', 'design build', 'Y&Y Construction'],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        zh: '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_CA',
      url: `https://yyconstruction.ca/${lang}`,
      siteName: title,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    icons: {
      icon: '/favicon.svg',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;

  return (
    <html lang={lang} className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full font-sans bg-[#192324] text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
