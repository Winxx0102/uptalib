import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Define the Role enum locally if not exported by Prisma
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role, {
    message: 'El rol debe ser: USER, ADMIN o SUPERADMIN',
  })
  role?: Role; 
}