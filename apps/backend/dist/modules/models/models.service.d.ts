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
export declare class ModelsService {
    private models;
    private labs;
    constructor();
    private loadData;
    findAll(filters?: {
        lab?: string;
        category?: string;
        search?: string;
    }): Model[];
    findOne(id: string): Model | null;
    getStats(): {
        totalModels: number;
        totalLabs: number;
        totalRequests: number;
        totalUsers: number;
        avgRating: number;
        categories: string[];
    };
    getLabs(): Lab[];
    getLabById(id: string): Lab | null;
}
