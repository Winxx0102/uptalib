import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './estrategies/jwt.strategy';


@Module({
  imports: [
    UsersModule,
    PassportModule,
  // src/auth/auth.module.ts
JwtModule.register({
  secret: process.env.JWT_SECRET || 'secretKey', // Usa la variable de entorno
  signOptions: { expiresIn: '24h' },
}),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}