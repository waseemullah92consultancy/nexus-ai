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
export declare class UsersService {
    private users;
    constructor();
    private loadUsers;
    private saveUsers;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(email: string, password: string, name: string): Promise<Omit<User, 'password' | 'refreshToken'>>;
    validatePassword(email: string, password: string): Promise<Omit<User, 'password' | 'refreshToken'> | null>;
    setRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
    validateRefreshToken(userId: string, refreshToken: string): Promise<Omit<User, 'password' | 'refreshToken'> | null>;
}
