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

  const getPriorityColor = (priority: IdeationItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700';
      case 'low': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700';
    }
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Ideation Workspace</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isAdding ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="mb-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description and brainstorming notes..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
            />
          </div>
          <div className="mb-3">
            <textarea
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              placeholder="Next steps (one per line)..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as IdeationItem['priority'])}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* Items List */}
      <div className="grid md:grid-cols-2 gap-4">
        {sortedItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8 col-span-2">
            No projects yet. Click "+ New Project" to add one!
          </p>
        ) : (
          sortedItems.map(item => (
            <div key={item.id} className={`p-4 border-2 rounded-lg ${getPriorityColor(item.priority)}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <span className="px-2 py-1 text-xs bg-white/50 dark:bg-black/30 rounded">
                  {item.priority.toUpperCase()}
                </span>
              </div>
              
              {item.description && (
                <p className="mb-3 opacity-90">{item.description}</p>
              )}

              {item.nextSteps.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold text-sm mb-1">Next Steps:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {item.nextSteps.map((step, idx) => (
                      <li key={idx} className="text-sm opacity-90">{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs opacity-75 mt-2">
                Created {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
