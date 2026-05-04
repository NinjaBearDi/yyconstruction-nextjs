'use client';

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ questions }: { questions: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="space-y-0">
      {questions.map((item, idx) => {
        const isOpen = openIndex === idx;
        const isLast = idx === questions.length - 1;

        return (
          <div
            key={idx}
            className={`${!isLast ? 'border-b border-gray-200 mb-6 pb-4' : ''}`}
          >
            {/* Question Button */}
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-start justify-between text-left py-2 group"
            >
              <span
                className={`text-lg md:text-xl font-semibold pr-8 transition-colors duration-300 ${
                  isOpen ? 'text-[#aa8b57]' : 'text-[#192324] group-hover:text-[#aa8b57]'
                }`}
              >
                <span className="mr-2">{idx + 1}.</span>
                {item.q}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-1 ${
                  isOpen
                    ? 'bg-[#aa8b57] text-white rotate-0'
                    : 'bg-gray-100 text-[#192324] group-hover:bg-[#aa8b57]/10'
                }`}
              >
                {isOpen ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                )}
              </span>
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-600 leading-relaxed pr-10 pt-3 pb-2">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
