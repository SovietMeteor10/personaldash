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
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Research Reports</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search reports..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
        />
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {reports.length === 0 
              ? 'No research reports yet. They will auto-populate from Discord /dr commands.'
              : 'No reports match your search.'}
          </p>
        ) : (
          filteredReports.map(report => (
            <div key={report.id} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{report.title}</h3>
                <button
                  onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {expandedId === report.id ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              {report.tags && report.tags.length > 0 && (
                <div className="flex gap-2 mb-2">
                  {report.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {expandedId === report.id && (
                <div className="mt-3 prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{report.content}</ReactMarkdown>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-2">
                {new Date(report.timestamp).toLocaleDateString()} at {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
