import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly accessTokenSecret;
    private readonly refreshTokenSecret;
    constructor(usersService: UsersService, jwtService: JwtService);
    signup(email: string, password: string, name: string, res: Response): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            avatar: string | undefined;
        };
    }>;
    signin(email: string, password: string, res: Response): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            avatar: string | undefined;
        };
    }>;
    refresh(refreshToken: string, res: Response): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            avatar: string | undefined;
        };
    }>;
    signout(userId: string, res: Response): Promise<{
        message: string;
    }>;
    me(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        avatar: string | undefined;
        createdAt: string;
    }>;
    private generateTokens;
    private setCookieTokens;
}
