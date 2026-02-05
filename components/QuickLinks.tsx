'use client';

import { QuickLink } from '@/types';

interface QuickLinksProps {
  links: QuickLink[];
}

export default function QuickLinks({ links }: QuickLinksProps) {
  const featuredLinks = links.filter(link => link.featured);
  const otherLinks = links.filter(link => !link.featured);

  return (
    <section className="mb-10">
      <h2 className="text-xs uppercase tracking-wider font-semibold mb-4 pb-2" style={{ color: '#ffffff', borderBottom: '1px solid #353535', letterSpacing: '0.05em' }}>
        Quick Links
      </h2>
      
      {/* Featured Links */}
      <div className="space-y-3 mb-5">
        {featuredLinks.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block pl-3 transition-colors hover:opacity-80"
            style={{ borderLeft: '2px solid #ffffff' }}
          >
            <div className="text-base font-medium" style={{ color: '#ffffff', lineHeight: '1.4' }}>
              {link.title}
            </div>
          </a>
        ))}
      </div>

      {/* Other Links */}
      {otherLinks.length > 0 && (
        <div className="space-y-3">
          {otherLinks.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block pl-3 transition-colors hover:opacity-80"
              style={{ borderLeft: '2px solid #666666' }}
            >
              <div className="text-sm font-medium" style={{ color: '#ffffff', lineHeight: '1.4' }}>
                {link.title}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
