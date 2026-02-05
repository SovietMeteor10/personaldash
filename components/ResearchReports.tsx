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
                  className="text-xs ml-3 transition-opacity hover:opacity-70 flex-shrink-0"
                  style={{ color: '#999999' }}
                >
                  {expandedId === report.id ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              {report.tags && report.tags.length > 0 && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {report.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1" style={{ 
                      color: '#999999',
                      backgroundColor: '#353535',
                      borderRadius: '2px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {expandedId === report.id && (
                <div 
                  className="mt-4 mb-4 markdown-content"
                  style={{ 
                    color: '#cccccc',
                    fontSize: '14px',
                    lineHeight: '1.6'
                  }}
                >
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 style={{ 
                        fontSize: '24px', 
                        fontWeight: '600', 
                        color: '#ffffff', 
                        marginBottom: '16px',
                        marginTop: '24px',
                        letterSpacing: '-0.02em'
                      }} {...props} />,
                      h2: ({node, ...props}) => <h2 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: '#ffffff', 
                        marginBottom: '12px',
                        marginTop: '20px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid #353535'
                      }} {...props} />,
                      h3: ({node, ...props}) => <h3 style={{ 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: '#ffffff', 
                        marginBottom: '8px',
                        marginTop: '16px'
                      }} {...props} />,
                      p: ({node, ...props}) => <p style={{ 
                        marginBottom: '12px',
                        color: '#cccccc'
                      }} {...props} />,
                      ul: ({node, ...props}) => <ul style={{ 
                        marginLeft: '20px',
                        marginBottom: '12px',
                        listStyleType: 'disc'
                      }} {...props} />,
                      ol: ({node, ...props}) => <ol style={{ 
                        marginLeft: '20px',
                        marginBottom: '12px',
                        listStyleType: 'decimal'
                      }} {...props} />,
                      li: ({node, ...props}) => <li style={{ 
                        marginBottom: '4px',
                        color: '#cccccc'
                      }} {...props} />,
                      strong: ({node, ...props}) => <strong style={{ 
                        fontWeight: '600',
                        color: '#ffffff'
                      }} {...props} />,
                      em: ({node, ...props}) => <em style={{ 
                        fontStyle: 'italic',
                        color: '#ffffff'
                      }} {...props} />,
                      code: ({node, ...props}) => <code style={{ 
                        backgroundColor: '#353535',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        fontSize: '13px',
                        color: '#ffffff'
                      }} {...props} />,
                      hr: ({node, ...props}) => <hr style={{ 
                        border: 'none',
                        borderTop: '1px solid #353535',
                        margin: '20px 0'
                      }} {...props} />,
                      blockquote: ({node, ...props}) => <blockquote style={{ 
                        borderLeft: '2px solid #666666',
                        paddingLeft: '16px',
                        marginLeft: '0',
                        marginBottom: '12px',
                        color: '#999999'
                      }} {...props} />,
                    }}
                  >
                    {report.content}
                  </ReactMarkdown>
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
