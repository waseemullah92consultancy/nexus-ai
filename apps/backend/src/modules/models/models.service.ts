import * as fs from 'fs';
import * as path from 'path';

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

const MODELS_FILE = path.join(__dirname, '../../data/models.json');
const LABS_FILE = path.join(__dirname, '../../data/labs.json');

export class ModelsService {
  private models: Model[] = [];
  private labs: Lab[] = [];

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      const modelsData = fs.readFileSync(MODELS_FILE, 'utf-8');
      this.models = JSON.parse(modelsData);
    } catch {
      this.models = [];
    }

    try {
      const labsData = fs.readFileSync(LABS_FILE, 'utf-8');
      this.labs = JSON.parse(labsData);
    } catch {
      this.labs = [];
    }
  }

  findAll(filters?: {
    lab?: string;
    category?: string;
    search?: string;
  }): Model[] {
    let result = [...this.models];

    if (filters?.lab) {
      result = result.filter((model) =>
        model.lab.toLowerCase() === filters.lab!.toLowerCase() ||
        model.labId.toLowerCase() === filters.lab!.toLowerCase()
      );
    }

    if (filters?.category) {
      result = result.filter((model) =>
        model.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (model) =>
          model.name.toLowerCase().includes(searchLower) ||
          model.description.toLowerCase().includes(searchLower) ||
          model.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }

  findOne(id: string): Model | null {
    return this.models.find((model) => model.id === id || model.slug === id) || null;
  }

  getStats() {
    const totalModels = this.models.length;
    const totalLabs = this.labs.length;
    const totalRequests = this.models.reduce(
      (sum, model) => sum + model.stats.requests,
      0
    );
    const totalUsers = this.models.reduce(
      (sum, model) => sum + model.stats.users,
      0
    );
    const avgRating =
      this.models.reduce((sum, model) => sum + model.rating, 0) / totalModels;

    const categories = [...new Set(this.models.map((m) => m.category))];

    return {
      totalModels,
      totalLabs,
      totalRequests,
      totalUsers,
      avgRating: Math.round(avgRating * 10) / 10,
      categories,
    };
  }

  getLabs(): Lab[] {
    return this.labs;
  }

  getLabById(id: string): Lab | null {
    return this.labs.find((lab) => lab.id === id || lab.slug === id) || null;
  }
}