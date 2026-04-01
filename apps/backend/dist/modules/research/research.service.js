"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchService = void 0;
const fs = require("fs");
const path = require("path");
const RESEARCH_FILE = path.join(__dirname, '../../data/research.json');
class ResearchService {
    constructor() {
        this.research = [];
        this.loadData();
    }
    loadData() {
        try {
            const data = fs.readFileSync(RESEARCH_FILE, 'utf-8');
            this.research = JSON.parse(data);
        }
        catch {
            this.research = [];
        }
    }
    findAll(filters) {
        let result = [...this.research];
        if (filters?.lab) {
            result = result.filter((r) => r.lab.toLowerCase() === filters.lab.toLowerCase());
        }
        if (filters?.category) {
            result = result.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
        }
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter((r) => r.title.toLowerCase().includes(searchLower) ||
                r.abstract.toLowerCase().includes(searchLower) ||
                r.tags.some((tag) => tag.toLowerCase().includes(searchLower)));
        }
        return result;
    }
    findOne(id) {
        return this.research.find((r) => r.id === id) || null;
    }
    getTrending() {
        return this.research
            .filter((r) => r.trending)
            .sort((a, b) => b.citations - a.citations);
    }
    getCategories() {
        return [...new Set(this.research.map((r) => r.category))];
    }
    getLabs() {
        return [...new Set(this.research.map((r) => r.lab))];
    }
}
exports.ResearchService = ResearchService;
//# sourceMappingURL=research.service.js.map