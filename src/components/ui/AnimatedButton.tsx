import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AnimatedButtonProps {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  icon?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  text,
  variant = 'primary',
  className = '',
  icon = '/images/arrow-white.svg',
}) => {
  const baseClasses = "group relative inline-flex items-center justify-center font-bold text-[14px] md:text-[15px] px-8 md:px-10 py-3.5 md:py-4 overflow-hidden rounded-md transition-all duration-500 shadow-lg hover:shadow-xl min-w-[180px]";
  
  const variants = {
    primary: {
      bg: "bg-[#aa8b57] text-white",
      hoverBg: "bg-[#192324]",
      icon: icon
    },
    secondary: {
      bg: "bg-[#192324] text-white",
      hoverBg: "bg-[#aa8b57]",
      icon: icon
    },
    white: {
      bg: "bg-white text-[#aa8b57]",
      hoverBg: "bg-[#aa8b57]",
      icon: "/images/arrow-accent.svg" // Adjust if needed
    }
  };

  const currentVariant = variants[variant];

  return (
    <Link 
      href={href} 
      className={`${baseClasses} ${currentVariant.bg} ${className}`}
    >
      <span className={`absolute top-0 bottom-0 left-[-15%] right-0 w-0 h-[106%] ${currentVariant.hoverBg} -skew-x-[45deg] transition-all duration-400 group-hover:w-full group-hover:skew-x-0 group-hover:left-0 z-0`}></span>
      <span className="relative z-10 pr-6 capitalize tracking-widest transition-colors duration-400 group-hover:text-white">
        {text}
      </span>
      <Image 
        src={currentVariant.icon} 
        alt="Arrow" 
        width={18} 
        height={18} 
        className={`absolute right-5 top-1/2 -translate-y-1/2 z-10 transition-all duration-400 group-hover:translate-x-1 w-auto h-auto ${variant === 'white' ? 'group-hover:invert group-hover:brightness-0' : ''}`} 
      />
    </Link>
  );
};

export default AnimatedButton;
