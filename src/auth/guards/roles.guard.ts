import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator'; // Importa tu constante

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Usamos ROLES_KEY en lugar de 'roles'
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    
    // Leemos el header 'role' enviado desde Thunder Client
    const userRole = request.headers['role'];

    if (!requiredRoles.includes(userRole as Role)) {
      throw new ForbiddenException(`Se requiere el rol: ${requiredRoles}`);
    }
    
    return true;
  }
}
