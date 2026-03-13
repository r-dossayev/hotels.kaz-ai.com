'use client';

import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="
                w-full flex items-center justify-between px-5 py-4 text-left
                bg-white hover:bg-neutral-50 transition-colors duration-150
                focus:outline-none focus:bg-primary-50
              "
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-neutral-800">{item.title}</span>
              <svg
                className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`
                overflow-hidden transition-all duration-300 ease-out
                ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="px-5 py-4 text-sm text-neutral-600 leading-relaxed bg-neutral-50/50">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
