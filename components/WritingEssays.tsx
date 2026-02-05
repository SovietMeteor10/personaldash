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

  const getStatusColor = (status: Essay['status']) => {
    switch (status) {
      case 'idea': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
      case 'draft': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'completed': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    }
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Writing & Essays</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {isAdding ? 'Cancel' : '+ New Essay'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="mb-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Essay title or prompt..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Notes, outline, or draft content..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Essay['status'])}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Essay
            </button>
          </div>
        </form>
      )}

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Essay['status'] | 'All')}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
        >
          <option value="All">All Statuses</option>
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Essays List */}
      <div className="space-y-3">
        {filteredEssays.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No essays yet. Click "+ New Essay" to add one!</p>
        ) : (
          filteredEssays.map(essay => (
            <div key={essay.id} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{essay.title}</h3>
                <span className={`px-2 py-1 text-xs rounded ${getStatusColor(essay.status)}`}>
                  {essay.status}
                </span>
              </div>
              {essay.content && (
                <p className="text-gray-600 dark:text-gray-400 mb-2 whitespace-pre-wrap">{essay.content}</p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(essay.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
