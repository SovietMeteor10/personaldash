'use client';

import { useState } from 'react';
import { Idea } from '@/types';

interface IdeaParkingLotProps {
  ideas: Idea[];
  onAddIdea: (idea: Omit<Idea, 'id' | 'timestamp'>) => void;
}

const categories: Idea['category'][] = ['Business', 'Training', 'Learning', 'Trading/ML', 'Personal'];

export default function IdeaParkingLot({ ideas, onAddIdea }: IdeaParkingLotProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Idea['category']>('Business');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<Idea['category'] | 'All'>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddIdea({
      title: title.trim(),
      content: content.trim(),
      category,
      tags: [],
    });

    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || idea.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Idea Parking Lot</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {isAdding ? 'Cancel' : '+ New Idea'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="mb-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Idea title..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Quick notes..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Idea['category'])}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Idea
            </button>
          </div>
        </form>
      )}

      {/* Search and Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ideas..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as Idea['category'] | 'All')}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Ideas List */}
      <div className="space-y-3">
        {filteredIdeas.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No ideas yet. Click "+ New Idea" to add one!</p>
        ) : (
          filteredIdeas.map(idea => (
            <div key={idea.id} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{idea.title}</h3>
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  {idea.category}
                </span>
              </div>
              {idea.content && (
                <p className="text-gray-600 dark:text-gray-400 mb-2">{idea.content}</p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(idea.timestamp).toLocaleDateString()} at {new Date(idea.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
