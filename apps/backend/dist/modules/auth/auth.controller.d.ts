import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { CurrentUserData } from '../../common/decorators';
declare class SignupDto {
    email: string;
    password: string;
    name: string;
}
declare class SigninDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto, res: Response): Promise<Response<any, Record<string, any>>>;
    signin(dto: SigninDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signout(user: CurrentUserData, res: Response): Promise<Response<any, Record<string, any>>>;
    me(user: CurrentUserData): Promise<{
        id: string;
        email: string;
        name: string;
        avatar: string | undefined;
        createdAt: string;
    }>;
}
export {};
