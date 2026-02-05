'use client';

import { useState, useEffect } from 'react';
import QuickLinks from '@/components/QuickLinks';
import IdeaParkingLot from '@/components/IdeaParkingLot';
import WritingEssays from '@/components/WritingEssays';
import ResearchReports from '@/components/ResearchReports';
import IdeationWorkspace from '@/components/IdeationWorkspace';
import ThemeToggle from '@/components/ThemeToggle';
import { QuickLink, Idea, Essay, ResearchReport, IdeationItem } from '@/types';

export default function Home() {
  const [links, setLinks] = useState<QuickLink[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [essays, setEssays] = useState<Essay[]>([]);
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [ideation, setIdeation] = useState<IdeationItem[]>([]);
  const [activeTab, setActiveTab] = useState('ideas');

  useEffect(() => {
    // Load data
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setLinks(data.links);
        setIdeas(data.ideas);
        setEssays(data.essays);
        setReports(data.reports);
        setIdeation(data.ideation);
      });
  }, []);

  const addIdea = async (idea: Omit<Idea, 'id' | 'timestamp'>) => {
    const newIdea: Idea = {
      ...idea,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    const response = await fetch('/api/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIdea),
    });

    if (response.ok) {
      setIdeas([newIdea, ...ideas]);
    }
  };

  const addEssay = async (essay: Omit<Essay, 'id' | 'timestamp'>) => {
    const newEssay: Essay = {
      ...essay,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    const response = await fetch('/api/essays', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEssay),
    });

    if (response.ok) {
      setEssays([newEssay, ...essays]);
    }
  };

  const addIdeation = async (item: Omit<IdeationItem, 'id' | 'timestamp'>) => {
    const newItem: IdeationItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    const response = await fetch('/api/ideation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      setIdeation([newItem, ...ideation]);
    }
  };

  const tabs = [
    { id: 'ideas', label: 'Ideas', count: ideas.length },
    { id: 'essays', label: 'Writing', count: essays.length },
    { id: 'research', label: 'Research', count: reports.length },
    { id: 'ideation', label: 'Projects', count: ideation.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Personal Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Your central hub for ideas, writing, and research</p>
          </div>
          <ThemeToggle />
        </header>

        {/* Quick Links */}
        <QuickLinks links={links} />

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.label} {tab.count > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'ideas' && <IdeaParkingLot ideas={ideas} onAddIdea={addIdea} />}
          {activeTab === 'essays' && <WritingEssays essays={essays} onAddEssay={addEssay} />}
          {activeTab === 'research' && <ResearchReports reports={reports} />}
          {activeTab === 'ideation' && <IdeationWorkspace items={ideation} onAddItem={addIdeation} />}
        </div>
      </div>
    </div>
  );
}
