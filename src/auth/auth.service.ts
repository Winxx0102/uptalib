import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  logout(res: any) {
    res.clearCookie('jwt')
    return { message: 'Sesión Cerrada', status: 'success' }

  }
  async login(email: string, pass: string, res: Response) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000,
    })


    return {
      state: 'success',
      message: 'Login exitoso',

    };
  }
}