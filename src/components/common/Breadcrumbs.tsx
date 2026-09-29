import React from 'react';
import { ChevronLeft, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  const allItems: BreadcrumbItem[] = [{ label: 'خانه', path: '/' }, ...items];

  // Schema.org BreadcrumbList JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `https://asana-log.com${item.path}` : undefined,
    })),
  };

  return (
    <nav aria-label="موقعیت در سایت" className="py-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ol className="flex items-center flex-wrap gap-2 text-xs text-neutral-500">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index === 0 && <Home className="w-3.5 h-3.5 text-neutral-400" />}

              {!isLast && item.path ? (
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.path) {
                      onNavigate(item.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-[#0A2540] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-semibold text-[#0A2540]">{item.label}</span>
              )}

              {!isLast && <ChevronLeft className="w-3 h-3 text-neutral-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
