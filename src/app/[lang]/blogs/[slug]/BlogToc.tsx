'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

interface BlogTocProps {
  items: TocItem[];
  dict: {
    contents: string;
  };
}

export default function BlogToc({ items, dict }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visible.length > 0) {
          const firstVisible = items.find((item) => visible.includes(item.id));
          if (firstVisible) setActiveId(firstVisible.id);
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = (window.scrollY / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Top reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-[#aa8b57] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className="sticky top-24 self-start">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#aa8b57] mb-4">
            {dict.contents}
          </h4>
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`block py-1.5 text-sm leading-snug transition-all duration-200 border-l-2 ${
                      item.level === 'h3' ? 'pl-6' : 'pl-3'
                    } ${
                      isActive
                        ? 'border-[#aa8b57] text-[#aa8b57] font-semibold'
                        : 'border-gray-100 text-gray-500 hover:text-[#192324] hover:border-gray-300'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
