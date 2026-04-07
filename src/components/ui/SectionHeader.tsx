import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  description?: string;
  light?: boolean;
  centered?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  light = false,
  centered = false,
  className = '',
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      <div className={`flex items-center mb-4 ${centered ? 'justify-center' : 'justify-start'}`}>
        <span className="w-12 h-0.5 bg-[#aa8b57] mr-4 shrink-0 inline-block"></span>
        <h3 className="text-[#aa8b57] text-lg md:text-xl font-bold uppercase tracking-wider">
          {title}
        </h3>
      </div>
      
      {subtitle && (
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] mb-6 tracking-tight ${light ? 'text-white' : 'text-[#192324]'}`}>
          {subtitle}
        </h2>
      )}
      
      {description && (
        <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-[#283132]'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
