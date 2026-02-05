'use client';

import { useState } from 'react';
import { Essay } from '@/types';

interface WritingEssaysProps {
  essays: Essay[];
  onAddEssay: (essay: Omit<Essay, 'id' | 'timestamp'>) => void;
}

const statusOptions: Essay['status'][] = ['idea', 'draft', 'in-progress', 'completed'];

export default function WritingEssays({ essays, onAddEssay }: WritingEssaysProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<Essay['status']>('idea');
  const [filterStatus, setFilterStatus] = useState<Essay['status'] | 'All'>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddEssay({
      title: title.trim(),
      content: content.trim(),
      status,
      tags: [],
    });

    setTitle('');
    setContent('');
    setStatus('idea');
    setIsAdding(false);
  };

  const filteredEssays = essays.filter(essay => 
    filterStatus === 'All' || essay.status === filterStatus
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs uppercase tracking-wider font-medium transition-opacity hover:opacity-70"
          style={{ color: '#999999' }}
        >
          {isAdding ? '× Cancel' : '+ New Essay'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-8 p-5" style={{ backgroundColor: '#353535', borderRadius: '2px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Essay title or prompt..."
            className="w-full px-0 py-2 mb-3 border-0 border-b text-sm"
            style={{ 
              backgroundColor: 'transparent',
              borderBottom: '1px solid #666666',
              color: '#ffffff',
              outline: 'none'
            }}
            autoFocus
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Notes, outline, or draft content..."
            rows={4}
            className="w-full px-0 py-2 mb-4 border-0 text-sm resize-none"
            style={{ 
              backgroundColor: 'transparent',
              color: '#ffffff',
              outline: 'none'
            }}
          />
          <div className="flex gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Essay['status'])}
              className="px-3 py-1 text-xs capitalize"
              style={{ 
                backgroundColor: '#2b2b2b',
                border: '1px solid #666666',
                color: '#ffffff'
              }}
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-1 text-xs uppercase tracking-wider font-medium transition-opacity hover:opacity-70"
              style={{ 
                backgroundColor: '#ffffff',
                color: '#2b2b2b'
              }}
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Essay['status'] | 'All')}
          className="px-3 py-2 text-xs capitalize"
          style={{ 
            backgroundColor: '#353535',
            border: 'none',
            color: '#ffffff'
          }}
        >
          <option value="All">All Statuses</option>
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Essays List */}
      <div className="space-y-5">
        {filteredEssays.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: '#666666' }}>
            No essays yet. Click "+ New Essay" to add one.
          </p>
        ) : (
          filteredEssays.map(essay => (
            <div key={essay.id} className="pl-3" style={{ borderLeft: '2px solid #666666' }}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-base" style={{ color: '#ffffff', lineHeight: '1.4' }}>
                  {essay.title}
                </h3>
                <span className="text-xs ml-3 capitalize" style={{ color: '#999999' }}>
                  {essay.status}
                </span>
              </div>
              {essay.content && (
                <p className="text-sm mb-2 whitespace-pre-wrap" style={{ color: '#999999' }}>{essay.content}</p>
              )}
              <p className="text-xs" style={{ color: '#666666' }}>
                {new Date(essay.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
