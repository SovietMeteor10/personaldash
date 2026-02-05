'use client';

import { QuickLink } from '@/types';

interface QuickLinksProps {
  links: QuickLink[];
}

export default function QuickLinks({ links }: QuickLinksProps) {
  const featuredLinks = links.filter(link => link.featured);
  const otherLinks = links.filter(link => !link.featured);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
      
      {/* Featured Links - Prominent Display */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {featuredLinks.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg hover:shadow-lg transition-all hover:scale-105"
          >
            <span className="text-4xl">{link.icon}</span>
            <span className="text-xl font-semibold">{link.title}</span>
          </a>
        ))}
      </div>

      {/* Other Links */}
      {otherLinks.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {otherLinks.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.title}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
