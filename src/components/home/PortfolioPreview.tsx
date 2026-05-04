'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedButton from '@/components/ui/AnimatedButton';
import type { Project } from '@/lib/payload/project-queries';

interface PortfolioPreviewProps {
  projects: Project[];
  dict: {
    title: string;
    subtitle: string;
    subtitleAccent: string;
    description: string;
    viewAll: string;
  };
  lang?: 'en' | 'zh';
}

const PortfolioPreview = ({ projects, dict, lang = 'en' }: PortfolioPreviewProps) => {
  const previewProjects = projects.slice(0, 6);

  return (
    <section className="py-20 bg-[#f8fcf9] relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[url('/images/section-bg-shape-2.svg')] bg-no-repeat bg-right-top opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 lg:mb-20 items-start">
          <SectionHeader
            title={dict.title}
            subtitle={<>{dict.subtitle} <span className="text-[#aa8b57]">{dict.subtitleAccent}</span></>}
            className="!mb-0 [&>h2]:!mb-0"
          />

          <div className="lg:pl-12 lg:pt-[52px]">
            <p className="text-[#283132] text-lg md:text-xl leading-relaxed max-w-xl">
              {dict.description}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-6">
                {/* Project Image */}
                <Image
                  src={project.featuredImage}
                  alt={project.title[lang]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {/* Hover Button Circle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <Link
                    href={`/${lang}/portfolio/${project.slug}`}
                    className="group/btn w-16 h-16 md:w-20 md:h-20 bg-white/20 hover:bg-[#192324] backdrop-blur-md rounded-full flex items-center justify-center overflow-hidden transition-colors duration-400"
                  >
                    <Image
                      src="/images/arrow-white.svg"
                      alt="View Project"
                      width={24}
                      height={24}
                      className="block -rotate-45 group-hover/btn:rotate-0 transition-transform duration-400 ease-in-out w-auto h-auto"
                    />
                  </Link>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-2">
                <p className="text-[#aa8b57] text-sm font-bold uppercase tracking-widest">
                  {project.category}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-[#192324] hover:text-[#aa8b57] transition-colors duration-300">
                  <Link href={`/${lang}/portfolio/${project.slug}`}>{project.title[lang]}</Link>
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <AnimatedButton href={`/${lang}/portfolio`} text={dict.viewAll} variant="primary" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
