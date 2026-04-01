import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly accessTokenSecret =
    process.env.JWT_SECRET || 'nexusai-super-secret-key-change-in-production';
  private readonly refreshTokenSecret =
    process.env.JWT_REFRESH_SECRET || 'nexusai-refresh-secret-key-change-in-production';

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(
    email: string,
    password: string,
    name: string,
    res: Response,
  ) {
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
    } catch (error) {
      if (error.message === 'User already exists') {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async signin(email: string, password: string, res: Response) {
    const user = await this.usersService.validatePassword(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
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

  async refresh(refreshToken: string, res: Response) {
    let payload: { sub: string; email: string };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.refreshTokenSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.validateRefreshToken(
      payload.sub,
      refreshToken,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
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

  async signout(userId: string, res: Response) {
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

  async me(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };
  }

  private async generateTokens(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: this.accessTokenSecret,
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, email, jti: uuidv4() },
      {
        secret: this.refreshTokenSecret,
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  private setCookieTokens(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
  }
}