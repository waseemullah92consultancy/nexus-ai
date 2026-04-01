import { ModelsService } from './models.service';
export declare class ModelsController {
    private modelsService;
    constructor(modelsService: ModelsService);
    findAll(lab?: string, category?: string, search?: string): import("./models.service").Model[];
    getStats(): {
        totalModels: number;
        totalLabs: number;
        totalRequests: number;
        totalUsers: number;
        avgRating: number;
        categories: string[];
    };
    getLabs(): import("./models.service").Lab[];
    findOne(id: string): import("./models.service").Model | null;
}
