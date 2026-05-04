import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang;
  return {
    title: lang === 'zh' ? "右岩建筑 Y&Y Construction" : "Y & Y Construction",
    description: lang === 'zh' 
      ? "顶尖空间规划与一级施工品质的完美融合。" 
      : "Expert space planning meets top-tier construction quality in Vancouver.",
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
      </body>
    </html>
  );
}
