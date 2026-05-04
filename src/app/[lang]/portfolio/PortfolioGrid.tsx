'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/payload/queries';

interface PortfolioGridProps {
  projects: Project[];
  lang: 'en' | 'zh';
  filters: {
    all: string;
    commercial: string;
    residential: string;
  };
  projectCount: string;
}

type FilterKey = 'all' | 'commercial' | 'residential';

const PortfolioGrid = ({ projects, lang, filters, projectCount }: PortfolioGridProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filterButtons: { key: FilterKey; label: string }[] = [
    { key: 'all', label: filters.all },
    { key: 'commercial', label: filters.commercial },
    { key: 'residential', label: filters.residential },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6">
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setActiveFilter(btn.key)}
            className={`relative px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-400 border-2 cursor-pointer ${
              activeFilter === btn.key
                ? 'bg-[#aa8b57] border-[#aa8b57] text-white shadow-lg shadow-[#aa8b57]/25'
                : 'bg-transparent border-gray-200 text-[#283132] hover:border-[#aa8b57] hover:text-[#aa8b57]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Project Count */}
      <p className="text-center text-[#283132]/60 text-sm font-medium mb-12 md:mb-16">
        {filteredProjects.length} {projectCount}
      </p>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="group"
            >
              <Link href={`/${lang}/portfolio/${project.slug}`} className="block">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-6">
                  {/* Project Image */}
                  <Image
                    src={project.featuredImage}
                    alt={project.title[lang]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                  {/* Hover Button Circle */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 group-hover:bg-[#192324] backdrop-blur-md rounded-full flex items-center justify-center overflow-hidden transition-colors duration-400">
                      <Image
                        src="/images/arrow-white.svg"
                        alt="View Project"
                        width={24}
                        height={24}
                        className="block -rotate-45 group-hover:rotate-0 transition-transform duration-400 ease-in-out w-auto h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-2">
                  <p className="text-[#aa8b57] text-sm font-bold uppercase tracking-widest">
                    {project.category === 'commercial'
                      ? filters.commercial
                      : filters.residential}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-[#192324] group-hover:text-[#aa8b57] transition-colors duration-300">
                    {project.title[lang]}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default PortfolioGrid;
