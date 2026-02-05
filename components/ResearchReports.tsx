'use client';

import { useState } from 'react';
import { ResearchReport } from '@/types';
import ReactMarkdown from 'react-markdown';

interface ResearchReportsProps {
  reports: ResearchReport[];
}

export default function ResearchReports({ reports }: ResearchReportsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search reports..."
          className="w-full px-3 py-2 text-sm"
          style={{ 
            backgroundColor: '#353535',
            border: 'none',
            color: '#ffffff',
            outline: 'none'
          }}
        />
      </div>

      {/* Reports List */}
      <div className="space-y-5">
        {filteredReports.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: '#666666' }}>
            {reports.length === 0 
              ? 'No research reports yet. They will auto-populate from Discord /dr commands.'
              : 'No reports match your search.'}
          </p>
        ) : (
          filteredReports.map(report => (
            <div key={report.id} className="pl-3" style={{ borderLeft: '2px solid #666666' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-base" style={{ color: '#ffffff', lineHeight: '1.4' }}>
                  {report.title}
                </h3>
                <button
                  onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
                  className="text-xs ml-3 transition-opacity hover:opacity-70"
                  style={{ color: '#999999' }}
                >
                  {expandedId === report.id ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              {report.tags && report.tags.length > 0 && (
                <div className="flex gap-2 mb-2">
                  {report.tags.map(tag => (
                    <span key={tag} className="text-xs" style={{ color: '#666666' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {expandedId === report.id && (
                <div className="mt-3 mb-3 text-sm prose-sm" style={{ color: '#cccccc' }}>
                  <ReactMarkdown>{report.content}</ReactMarkdown>
                </div>
              )}

              <p className="text-xs" style={{ color: '#666666' }}>
                {new Date(report.timestamp).toLocaleDateString()} at {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
