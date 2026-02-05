export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  featured: boolean;
}

export interface Idea {
  id: string;
  title: string;
  category: 'Business' | 'Training' | 'Learning' | 'Trading/ML' | 'Personal';
  content: string;
  timestamp: string;
  tags?: string[];
}

export interface Essay {
  id: string;
  title: string;
  content: string;
  status: 'idea' | 'draft' | 'in-progress' | 'completed';
  timestamp: string;
  tags?: string[];
}

export interface ResearchReport {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  tags?: string[];
}

export interface IdeationItem {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  nextSteps: string[];
  linkedIdeas: string[];
  timestamp: string;
}
