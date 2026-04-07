'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedButton from '@/components/ui/AnimatedButton';

const projects = [
  {
    id: 1,
    category: 'Commercial',
    title: 'Gilmore Big Way',
    image: 'http://44.240.251.75/uploads/large_bigway_hotpot_gilmore_c40b73fa85.webp',
    link: '/portfolio/big-way-hot-pot-gilmore',
  },
  {
    id: 2,
    category: 'Commercial',
    title: 'Langley Big Way',
    image: 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/projects/langley-big-way/IMG_8804.jpg',
    link: '/portfolio/langley-big-way',
  },
  {
    id: 3,
    category: 'Commercial',
    title: 'Lougheed Big Way',
    image: 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/projects/lougheed-big-way/IMG_8821.jpg',
    link: '/portfolio/lougheed-big-way',
  },
  {
    id: 4,
    category: 'Residential',
    title: 'Old House Renovation',
    image: 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/projects/old-house-renovation/IMG_8836.jpg',
    link: '/portfolio/old-house-renovation',
  },
  {
    id: 5,
    category: 'Commercial',
    title: 'Oui Patisserie Dessert',
    image: 'http://44.240.251.75/uploads/small_oui_pastisserie_dessert_7aa7cf87ec.webp',
    link: '/portfolio/oui-patisserie-dessert',
  },
  {
    id: 6,
    category: 'Commercial',
    title: 'Pet Store - Bubble Bark Dog Grooming',
    image: 'https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/yyconstruction.ca/projects/pet-bubble-bark-dog-grooming/IMG_8825.jpg',
    link: '/portfolio/pet-bubble-bark-dog-grooming',
  },
];

const PortfolioPreview = () => {
  return (
    <section className="py-20 bg-[#f8fcf9] relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[url('/images/section-bg-shape-2.svg')] bg-no-repeat bg-right-top opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <SectionHeader
              title="Our Portfolio"
              subtitle={<>Creative projects that define {''}<span className="text-[#aa8b57]">our style</span></>}
              className="!mb-0 [&>h2]:!mb-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:max-w-md lg:pb-2"
          >
            <p className="text-[#283132] text-base md:text-lg leading-relaxed">
              Our portfolio showcases a diverse range of projects, from beautifully crafted residential spaces to functional and stylish commercial interiors.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {/* Hover Button Circle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <Link 
                    href={project.link}
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
                  <Link href={project.link}>{project.title}</Link>
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <AnimatedButton href="/portfolio" text="View All Projects" variant="primary" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;

