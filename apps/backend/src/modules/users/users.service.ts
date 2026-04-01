import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
}

const USERS_FILE = path.join(__dirname, '../../data/users.json');

export class UsersService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private loadUsers(): void {
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      this.users = JSON.parse(data);
    } catch {
      this.users = [];
    }
  }

  private saveUsers(): void {
    fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2));
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async create(
    email: string,
    password: string,
    name: string,
  ): Promise<Omit<User, 'password' | 'refreshToken'>> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();

    const newUser: User = {
      id: uuidv4(),
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

  async validatePassword(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password' | 'refreshToken'> | null> {
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

  async setRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) return;

    if (refreshToken) {
      this.users[userIndex].refreshToken = await bcrypt.hash(refreshToken, 12);
    } else {
      delete this.users[userIndex].refreshToken;
    }

    this.users[userIndex].updatedAt = new Date().toISOString();
    this.saveUsers();
  }

  async validateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Omit<User, 'password' | 'refreshToken'> | null> {
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