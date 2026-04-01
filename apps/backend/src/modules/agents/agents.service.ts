import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

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

const AGENTS_FILE = path.join(__dirname, '../../data/agents.json');

export class AgentsService {
  private agents: Agent[] = [];

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      const data = fs.readFileSync(AGENTS_FILE, 'utf-8');
      this.agents = JSON.parse(data);
    } catch {
      this.agents = [];
    }
  }

  private saveData(): void {
    fs.writeFileSync(AGENTS_FILE, JSON.stringify(this.agents, null, 2));
  }

  findAll(filters?: { category?: string; search?: string }): Agent[] {
    let result = [...this.agents];

    if (filters?.category) {
      result = result.filter(
        (agent) =>
          agent.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchLower) ||
          agent.description.toLowerCase().includes(searchLower) ||
          agent.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }

  findMine(ownerId: string): Agent[] {
    return this.agents.filter((a) => a.ownerId === ownerId);
  }

  findOne(id: string): Agent | null {
    return (
      this.agents.find((agent) => agent.id === id || agent.slug === id) || null
    );
  }

  getCategories(): string[] {
    return [...new Set(this.agents.map((a) => a.category))];
  }

  create(
    input: Omit<
      Agent,
      | 'id'
      | 'slug'
      | 'rating'
      | 'usageCount'
      | 'createdAt'
      | 'updatedAt'
      | 'ownerId'
      | 'visibility'
      | 'sourceTemplateId'
    > & { slug?: string; visibility?: 'public' | 'private' },
    ownerId: string,
  ): Agent {
    const now = new Date().toISOString();

    const baseSlug = (input.slug?.trim() || input.name.trim())
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const slug = this.ensureUniqueSlug(baseSlug);

    const agent: Agent = {
      id: `agent-${uuidv4()}`,
      name: input.name,
      slug,
      description: input.description,
      category: input.category,
      icon: input.icon,
      defaultModel: input.defaultModel,
      systemPrompt: input.systemPrompt,
      features: input.features,
      tags: input.tags,
      rating: 0,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
      ownerId,
      visibility: input.visibility ?? 'private',
    };

    this.agents.unshift(agent);
    this.saveData();
    return agent;
  }

  createFromTemplate(templateId: string, ownerId: string): Agent {
    const template = this.findOne(templateId);
    if (!template || template.ownerId) {
      throw new NotFoundException('Template not found');
    }

    const now = new Date().toISOString();
    const slug = this.ensureUniqueSlug(`${template.slug}-custom`);

    const agent: Agent = {
      ...template,
      id: `agent-${uuidv4()}`,
      slug,
      rating: 0,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
      ownerId,
      visibility: 'private',
      sourceTemplateId: template.id,
    };

    this.agents.unshift(agent);
    this.saveData();
    return agent;
  }

  update(
    id: string,
    updates: Partial<
      Pick<
        Agent,
        | 'name'
        | 'description'
        | 'category'
        | 'icon'
        | 'defaultModel'
        | 'systemPrompt'
        | 'features'
        | 'tags'
        | 'visibility'
      >
    >,
    ownerId: string,
  ): Agent {
    const idx = this.agents.findIndex((a) => a.id === id || a.slug === id);
    if (idx === -1) {
      throw new NotFoundException('Agent not found');
    }
    const agent = this.agents[idx];
    if (!agent.ownerId || agent.ownerId !== ownerId) {
      throw new ForbiddenException('You do not have access to this agent');
    }

    const next: Agent = {
      ...agent,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // If name changes, keep slug stable unless explicitly set elsewhere.
    this.agents[idx] = next;
    this.saveData();
    return next;
  }

  remove(id: string, ownerId: string): { deleted: true } {
    const idx = this.agents.findIndex((a) => a.id === id || a.slug === id);
    if (idx === -1) {
      throw new NotFoundException('Agent not found');
    }
    const agent = this.agents[idx];
    if (!agent.ownerId || agent.ownerId !== ownerId) {
      throw new ForbiddenException('You do not have access to this agent');
    }

    this.agents.splice(idx, 1);
    this.saveData();
    return { deleted: true };
  }

  private ensureUniqueSlug(base: string): string {
    const normalized = base || 'agent';
    if (!this.agents.some((a) => a.slug === normalized)) {
      return normalized;
    }
    for (let i = 2; i < 10_000; i++) {
      const candidate = `${normalized}-${i}`;
      if (!this.agents.some((a) => a.slug === candidate)) {
        return candidate;
      }
    }
    return `${normalized}-${uuidv4()}`;
  }
}