import * as fs from 'fs';
import * as path from 'path';

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

const RESEARCH_FILE = path.join(__dirname, '../../data/research.json');

export class ResearchService {
  private research: Research[] = [];

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      const data = fs.readFileSync(RESEARCH_FILE, 'utf-8');
      this.research = JSON.parse(data);
    } catch {
      this.research = [];
    }
  }

  findAll(filters?: {
    lab?: string;
    category?: string;
    search?: string;
  }): Research[] {
    let result = [...this.research];

    if (filters?.lab) {
      result = result.filter(
        (r) => r.lab.toLowerCase() === filters.lab!.toLowerCase()
      );
    }

    if (filters?.category) {
      result = result.filter(
        (r) => r.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(searchLower) ||
          r.abstract.toLowerCase().includes(searchLower) ||
          r.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }

  findOne(id: string): Research | null {
    return this.research.find((r) => r.id === id) || null;
  }

  getTrending(): Research[] {
    return this.research
      .filter((r) => r.trending)
      .sort((a, b) => b.citations - a.citations);
  }

  getCategories(): string[] {
    return [...new Set(this.research.map((r) => r.category))];
  }

  getLabs(): string[] {
    return [...new Set(this.research.map((r) => r.lab))];
  }
}