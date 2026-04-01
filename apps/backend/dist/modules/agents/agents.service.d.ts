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
export declare class AgentsService {
    private agents;
    constructor();
    private loadData;
    private saveData;
    findAll(filters?: {
        category?: string;
        search?: string;
    }): Agent[];
    findMine(ownerId: string): Agent[];
    findOne(id: string): Agent | null;
    getCategories(): string[];
    create(input: Omit<Agent, 'id' | 'slug' | 'rating' | 'usageCount' | 'createdAt' | 'updatedAt' | 'ownerId' | 'visibility' | 'sourceTemplateId'> & {
        slug?: string;
        visibility?: 'public' | 'private';
    }, ownerId: string): Agent;
    createFromTemplate(templateId: string, ownerId: string): Agent;
    update(id: string, updates: Partial<Pick<Agent, 'name' | 'description' | 'category' | 'icon' | 'defaultModel' | 'systemPrompt' | 'features' | 'tags' | 'visibility'>>, ownerId: string): Agent;
    remove(id: string, ownerId: string): {
        deleted: true;
    };
    private ensureUniqueSlug;
}
