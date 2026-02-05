'use client';

import { useState, useEffect } from 'react';
import QuickLinks from '@/components/QuickLinks';
import IdeaParkingLot from '@/components/IdeaParkingLot';
import WritingEssays from '@/components/WritingEssays';
import ResearchReports from '@/components/ResearchReports';
import IdeationWorkspace from '@/components/IdeationWorkspace';
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
    <div className="min-h-screen" style={{ backgroundColor: '#2b2b2b' }}>
      <div className="max-w-3xl mx-auto px-8 py-12">
        {/* Header */}
        <header className="mb-12 pb-6" style={{ borderBottom: '1px solid #404040' }}>
          <h1 className="text-3xl font-semibold mb-2 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            Personal Dashboard
          </h1>
          <p className="text-sm uppercase tracking-wider" style={{ color: '#666666' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </header>

        {/* Quick Links */}
        <QuickLinks links={links} />

        {/* Tabs */}
        <div className="mb-8 pb-2" style={{ borderBottom: '1px solid #353535' }}>
          <nav className="flex gap-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs uppercase tracking-wider font-medium transition-colors pb-2 ${
                  activeTab === tab.id
                    ? 'border-b-2'
                    : ''
                }`}
                style={{
                  color: activeTab === tab.id ? '#ffffff' : '#666666',
                  borderColor: activeTab === tab.id ? '#ffffff' : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'ideas' && <IdeaParkingLot ideas={ideas} onAddIdea={addIdea} />}
          {activeTab === 'essays' && <WritingEssays essays={essays} onAddEssay={addEssay} />}
          {activeTab === 'research' && <ResearchReports reports={reports} />}
          {activeTab === 'ideation' && <IdeationWorkspace items={ideation} onAddItem={addIdeation} />}
        </div>
      </div>
    </div>
  );
}
