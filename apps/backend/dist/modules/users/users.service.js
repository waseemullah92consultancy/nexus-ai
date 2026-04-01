"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const USERS_FILE = path.join(__dirname, '../../data/users.json');
class UsersService {
    constructor() {
        this.users = [];
        this.loadUsers();
        this.ensureDefaultDemoUser();
    }
    loadUsers() {
        try {
            const data = fs.readFileSync(USERS_FILE, 'utf-8');
            this.users = JSON.parse(data);
        }
        catch {
            this.users = [];
        }
    }
    saveUsers() {
        fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2));
    }
    ensureDefaultDemoUser() {
        const demoEmail = 'demo@nexusai.com';
        const demoExists = this.users.some((user) => user.email === demoEmail);
        if (demoExists) {
            return;
        }
        const now = new Date().toISOString();
        this.users.push({
            id: (0, uuid_1.v4)(),
            email: demoEmail,
            password: bcrypt.hashSync('demo1234', 12),
            name: 'Demo User',
            createdAt: now,
            updatedAt: now,
        });
        this.saveUsers();
    }
    async findByEmail(email) {
        return this.users.find((user) => user.email === email) || null;
    }
    async findById(id) {
        return this.users.find((user) => user.id === id) || null;
    }
    async create(email, password, name) {
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const now = new Date().toISOString();
        const newUser = {
            id: (0, uuid_1.v4)(),
            email,
            password: hashedPassword,
            name,
            createdAt: now,
            updatedAt: now,
        };
        this.users.push(newUser);
        this.saveUsers();
        const { password: _, refreshToken: __, ...userWithoutSensitive } = newUser;
        return userWithoutSensitive;
    }
    async validatePassword(email, password) {
        const user = await this.findByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const { password: _, refreshToken: __, ...userWithoutSensitive } = user;
        return userWithoutSensitive;
    }
    async setRefreshToken(userId, refreshToken) {
        const userIndex = this.users.findIndex((u) => u.id === userId);
        if (userIndex === -1)
            return;
        if (refreshToken) {
            this.users[userIndex].refreshToken = await bcrypt.hash(refreshToken, 12);
        }
        else {
            delete this.users[userIndex].refreshToken;
        }
        this.users[userIndex].updatedAt = new Date().toISOString();
        this.saveUsers();
    }
    async validateRefreshToken(userId, refreshToken) {
        const user = await this.findById(userId);
        if (!user || !user.refreshToken) {
            return null;
        }
        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid) {
            return null;
        }
        const { password: _, refreshToken: __, ...userWithoutSensitive } = user;
        return userWithoutSensitive;
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map