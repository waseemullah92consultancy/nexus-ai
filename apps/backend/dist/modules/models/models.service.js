"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsService = void 0;
const fs = require("fs");
const path = require("path");
const MODELS_FILE = path.join(__dirname, '../../data/models.json');
const LABS_FILE = path.join(__dirname, '../../data/labs.json');
class ModelsService {
    constructor() {
        this.models = [];
        this.labs = [];
        this.loadData();
    }
    loadData() {
        try {
            const modelsData = fs.readFileSync(MODELS_FILE, 'utf-8');
            this.models = JSON.parse(modelsData);
        }
        catch {
            this.models = [];
        }
        try {
            const labsData = fs.readFileSync(LABS_FILE, 'utf-8');
            this.labs = JSON.parse(labsData);
        }
        catch {
            this.labs = [];
        }
    }
    findAll(filters) {
        let result = [...this.models];
        if (filters?.lab) {
            result = result.filter((model) => model.lab.toLowerCase() === filters.lab.toLowerCase() ||
                model.labId.toLowerCase() === filters.lab.toLowerCase());
        }
        if (filters?.category) {
            result = result.filter((model) => model.category.toLowerCase() === filters.category.toLowerCase());
        }
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter((model) => model.name.toLowerCase().includes(searchLower) ||
                model.description.toLowerCase().includes(searchLower) ||
                model.tags.some((tag) => tag.toLowerCase().includes(searchLower)));
        }
        return result;
    }
    findOne(id) {
        return this.models.find((model) => model.id === id || model.slug === id) || null;
    }
    getStats() {
        const totalModels = this.models.length;
        const totalLabs = this.labs.length;
        const totalRequests = this.models.reduce((sum, model) => sum + model.stats.requests, 0);
        const totalUsers = this.models.reduce((sum, model) => sum + model.stats.users, 0);
        const avgRating = this.models.reduce((sum, model) => sum + model.rating, 0) / totalModels;
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
    getLabs() {
        return this.labs;
    }
    getLabById(id) {
        return this.labs.find((lab) => lab.id === id || lab.slug === id) || null;
    }
}
exports.ModelsService = ModelsService;
//# sourceMappingURL=models.service.js.map