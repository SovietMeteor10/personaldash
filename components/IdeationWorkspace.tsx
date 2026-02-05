'use client';

import { useState } from 'react';
import { IdeationItem } from '@/types';

interface IdeationWorkspaceProps {
  items: IdeationItem[];
  onAddItem: (item: Omit<IdeationItem, 'id' | 'timestamp'>) => void;
}

const priorities: IdeationItem['priority'][] = ['low', 'medium', 'high'];

export default function IdeationWorkspace({ items, onAddItem }: IdeationWorkspaceProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IdeationItem['priority']>('medium');
  const [nextSteps, setNextSteps] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddItem({
      title: title.trim(),
      description: description.trim(),
      priority,
      nextSteps: nextSteps.split('\n').filter(s => s.trim()),
      linkedIdeas: [],
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setNextSteps('');
    setIsAdding(false);
  };

  const sortedItems = [...items].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs uppercase tracking-wider font-medium transition-opacity hover:opacity-70"
          style={{ color: '#999999' }}
        >
          {isAdding ? '× Cancel' : '+ New Project'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-8 p-5" style={{ backgroundColor: '#353535', borderRadius: '2px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title..."
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description and brainstorming notes..."
            rows={4}
            className="w-full px-0 py-2 mb-3 border-0 text-sm resize-none"
            style={{ 
              backgroundColor: 'transparent',
              color: '#ffffff',
              outline: 'none'
            }}
          />
          <textarea
            value={nextSteps}
            onChange={(e) => setNextSteps(e.target.value)}
            placeholder="Next steps (one per line)..."
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
              value={priority}
              onChange={(e) => setPriority(e.target.value as IdeationItem['priority'])}
              className="px-3 py-1 text-xs capitalize"
              style={{ 
                backgroundColor: '#2b2b2b',
                border: '1px solid #666666',
                color: '#ffffff'
              }}
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
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

      {/* Items List */}
      <div className="space-y-6">
        {sortedItems.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: '#666666' }}>
            No projects yet. Click "+ New Project" to add one.
          </p>
        ) : (
          sortedItems.map(item => (
            <div key={item.id} className="pl-3" style={{ borderLeft: '2px solid #ffffff' }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-base" style={{ color: '#ffffff', lineHeight: '1.4' }}>
                  {item.title}
                </h3>
                <span className="text-xs uppercase ml-3" style={{ color: '#999999' }}>
                  {item.priority}
                </span>
              </div>
              
              {item.description && (
                <p className="mb-3 text-sm" style={{ color: '#cccccc' }}>{item.description}</p>
              )}

              {item.nextSteps.length > 0 && (
                <div className="mb-2">
                  <p className="font-medium text-xs uppercase tracking-wider mb-2" style={{ color: '#999999' }}>
                    Next Steps
                  </p>
                  <ul className="space-y-1 pl-3">
                    {item.nextSteps.map((step, idx) => (
                      <li key={idx} className="text-sm" style={{ color: '#cccccc', borderLeft: '1px solid #666666', paddingLeft: '8px' }}>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs" style={{ color: '#666666' }}>
                Created {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
