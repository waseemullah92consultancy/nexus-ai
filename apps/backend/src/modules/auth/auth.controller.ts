import { Controller, Post, Get, Body, UseGuards, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser, CurrentUserData } from '../../common/decorators';

class SignupDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @MinLength(2)
  name!: string;
}

class SigninDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res() res: Response) {
    const result = await this.authService.signup(dto.email, dto.password, dto.name, res);
    return res.json(result);
  }

  @Post('signin')
  async signin(@Body() dto: SigninDto, @Res() res: Response) {
    const result = await this.authService.signin(dto.email, dto.password, res);
    return res.json(result);
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }
    const result = await this.authService.refresh(refreshToken, res);
    return res.json(result);
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  async signout(@CurrentUser() user: CurrentUserData, @Res() res: Response) {
    const result = await this.authService.signout(user.userId, res);
    return res.json(result);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: CurrentUserData) {
    return this.authService.me(user.userId);
  }
}