import { Controller, Post, Body, HttpCode, HttpStatus, Res, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto.email, loginDto.password, res);
  }
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: any) {
    return this.authService.logout(res)
  }

  @Get('verify-session')
  @UseGuards(JwtAuthGuard)
  verifySession() {
    return {
      state: 'success',
      message: 'Sesión válida',
    };
  }
}