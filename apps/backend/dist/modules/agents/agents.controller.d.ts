import { AgentsService } from './agents.service';
import { CurrentUserData } from '../../common/decorators';
declare class CreateAgentDto {
    name: string;
    description: string;
    category: string;
    icon: string;
    defaultModel: string;
    systemPrompt: string;
    features: string[];
    tags: string[];
    visibility?: 'public' | 'private';
}
declare class UpdateAgentDto {
    name?: string;
    description?: string;
    category?: string;
    icon?: string;
    defaultModel?: string;
    systemPrompt?: string;
    features?: string[];
    tags?: string[];
    visibility?: 'public' | 'private';
}
export declare class AgentsController {
    private agentsService;
    constructor(agentsService: AgentsService);
    findAll(category?: string, search?: string): import("./agents.service").Agent[];
    findMine(user: CurrentUserData): import("./agents.service").Agent[];
    getCategories(): string[];
    create(dto: CreateAgentDto, user: CurrentUserData): import("./agents.service").Agent;
    createFromTemplate(id: string, user: CurrentUserData): import("./agents.service").Agent;
    update(id: string, dto: UpdateAgentDto, user: CurrentUserData): import("./agents.service").Agent;
    remove(id: string, user: CurrentUserData): {
        deleted: true;
    };
    findOne(id: string): import("./agents.service").Agent | null;
}
export {};
