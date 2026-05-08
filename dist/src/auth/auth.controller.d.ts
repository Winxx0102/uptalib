import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<{
        state: string;
        message: string;
    }>;
    logout(res: any): {
        message: string;
        status: string;
    };
    verifySession(): {
        state: string;
        message: string;
    };
}
