export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface ChatState {
  messages: Message[];
  activeModel: string | null;
  isLoading: boolean;
}

export interface UIState {
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
  onboardingComplete: boolean;
  theme: 'light' | 'dark';
}

export interface Model {
  id: string;
  name: string;
  slug: string;
  lab: string;
  labId: string;
  category: string;
  description: string;
  contextWindow: number;
  maxOutput: number;
  pricing: {
    input: number;
    output: number;
    currency: string;
    unit: string;
  };
  rating: number;
  reviews: number;
  features: string[];
  tags: string[];
  launchedAt: string;
  updatedAt: string;
  stats: {
    requests: number;
    users: number;
  };
}

export interface Lab {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  founded: number;
  website: string;
  modelsCount: number;
}

export interface Agent {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  defaultModel: string;
  systemPrompt: string;
  features: string[];
  tags: string[];
  rating: number;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  ownerId?: string;
  visibility?: 'public' | 'private';
  sourceTemplateId?: string;
}

export interface CreateAgentRequest {
  name: string;
  description: string;
  category: string;
  icon: string;
  defaultModel: string;
  systemPrompt: string;
  features: string[];
  tags: string[];
  visibility?: 'public' | 'private';
}

export interface UpdateAgentRequest {
  name?: string;
  description?: string;
  category?: string;
  icon?: string;
  defaultModel?: string;
  systemPrompt?: string;
  features?: string[];
  tags?: string[];
  visibility?: 'public' | 'private';
}

export interface Research {
  id: string;
  title: string;
  authors: string[];
  lab: string;
  category: string;
  abstract: string;
  url: string;
  publishedAt: string;
  tags: string[];
  citations: number;
  trending: boolean;
}

export interface ModelStats {
  totalModels: number;
  totalLabs: number;
  totalRequests: number;
  totalUsers: number;
  avgRating: number;
  categories: string[];
}