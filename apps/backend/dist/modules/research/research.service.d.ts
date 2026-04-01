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
export declare class ResearchService {
    private research;
    constructor();
    private loadData;
    findAll(filters?: {
        lab?: string;
        category?: string;
        search?: string;
    }): Research[];
    findOne(id: string): Research | null;
    getTrending(): Research[];
    getCategories(): string[];
    getLabs(): string[];
}
