import { ResearchService } from './research.service';
export declare class ResearchController {
    private researchService;
    constructor(researchService: ResearchService);
    findAll(lab?: string, category?: string, search?: string): import("./research.service").Research[];
    getTrending(): import("./research.service").Research[];
    getCategories(): string[];
    getLabs(): string[];
    findOne(id: string): import("./research.service").Research | null;
}
