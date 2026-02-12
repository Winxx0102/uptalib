import { Controller, Post, Body, Patch, Param, ParseIntPipe, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, Role } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Registro público
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Ver mi propio perfil y mis libros guardados
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser('userId') userId: number) {
    return this.usersService.findOne(userId);
  }

  // Solo el Superadmin puede cambiar roles de otros usuarios
  @Patch('role/:id')
  @Roles(Role.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: Role,
  ) {
    return this.usersService.updateRole(id, role);
  }
}