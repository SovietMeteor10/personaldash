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
    <section>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs uppercase tracking-wider font-medium transition-opacity hover:opacity-70"
          style={{ color: '#999999' }}
        >
          {isAdding ? '× Cancel' : '+ New Idea'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-8 p-5" style={{ backgroundColor: '#353535', borderRadius: '2px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Idea title..."
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
            placeholder="Quick notes..."
            rows={3}
            className="w-full px-0 py-2 mb-4 border-0 text-sm resize-none"
            style={{ 
              backgroundColor: 'transparent',
              color: '#ffffff',
              outline: 'none'
            }}
          />
          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Idea['category'])}
              className="px-3 py-1 text-xs"
              style={{ 
                backgroundColor: '#2b2b2b',
                border: '1px solid #666666',
                color: '#ffffff'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
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

      {/* Search and Filter */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ideas..."
          className="flex-1 px-3 py-2 text-sm"
          style={{ 
            backgroundColor: '#353535',
            border: 'none',
            color: '#ffffff',
            outline: 'none'
          }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as Idea['category'] | 'All')}
          className="px-3 py-2 text-xs"
          style={{ 
            backgroundColor: '#353535',
            border: 'none',
            color: '#ffffff'
          }}
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Ideas List */}
      <div className="space-y-5">
        {filteredIdeas.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: '#666666' }}>
            No ideas yet. Click "+ New Idea" to add one.
          </p>
        ) : (
          filteredIdeas.map(idea => (
            <div key={idea.id} className="pl-3" style={{ borderLeft: '2px solid #666666' }}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-base" style={{ color: '#ffffff', lineHeight: '1.4' }}>
                  {idea.title}
                </h3>
                <span className="text-xs ml-3" style={{ color: '#999999' }}>
                  {idea.category}
                </span>
              </div>
              {idea.content && (
                <p className="text-sm mb-2" style={{ color: '#999999' }}>{idea.content}</p>
              )}
              <p className="text-xs" style={{ color: '#666666' }}>
                {new Date(idea.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
