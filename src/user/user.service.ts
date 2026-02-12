import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client'; // Importamos el enum real de Prisma

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * CREACIÓN DE USUARIO (Registro)
   */
  async create(createUserDto: CreateUserDto) {
    const { email, password, name, role } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role, 
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  /**
   * BUSCAR POR EMAIL
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * ACTUALIZAR ROL (Solo SuperAdmin)
   */
  async updateRole(id: number, newRole: Role) { // Cambiamos 'any' por 'Role'
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { role: newRole },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`No se encontró el usuario con ID ${id}`);
    }
  }

  /**
   * OBTENER PERFIL
   */
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        saves: {
          include: {
            book: true, 
          },
        },
      },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    
    // Eliminamos la contraseña del objeto antes de retornar por si acaso
    const { password, ...result } = user;
    return result;
  }
} // <--- Aquí faltaba cerrar la clase