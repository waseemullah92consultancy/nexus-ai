"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.accessTokenSecret = process.env.JWT_SECRET || 'nexusai-super-secret-key-change-in-production';
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'nexusai-refresh-secret-key-change-in-production';
    }
    async signup(email, password, name, res) {
        try {
            const user = await this.usersService.create(email, password, name);
            const tokens = await this.generateTokens(user.id, user.email);
            await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
            this.setCookieTokens(res, tokens);
            return {
                message: 'Signup successful',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                },
            };
        }
        catch (error) {
            if (error.message === 'User already exists') {
                throw new common_1.ConflictException('Email already registered');
            }
            throw error;
        }
    }
    async signin(email, password, res) {
        const user = await this.usersService.validatePassword(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user.id, user.email);
        await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
        this.setCookieTokens(res, tokens);
        return {
            message: 'Signin successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
            },
        };
    }
    async refresh(refreshToken, res) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.refreshTokenSecret,
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const user = await this.usersService.validateRefreshToken(payload.sub, refreshToken);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const tokens = await this.generateTokens(user.id, user.email);
        await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
        this.setCookieTokens(res, tokens);
        return {
            message: 'Token refreshed successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
            },
        };
    }
    async signout(userId, res) {
        await this.usersService.setRefreshToken(userId, null);
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
        return { message: 'Signout successful' };
    }
    async me(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };
    }
    async generateTokens(userId, email) {
        const accessToken = await this.jwtService.signAsync({ sub: userId, email }, {
            secret: this.accessTokenSecret,
            expiresIn: '15m',
        });
        const refreshToken = await this.jwtService.signAsync({ sub: userId, email, jti: (0, uuid_1.v4)() }, {
            secret: this.refreshTokenSecret,
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    setCookieTokens(res, tokens) {
        res.cookie('access_token', tokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
            path: '/',
        });
        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map