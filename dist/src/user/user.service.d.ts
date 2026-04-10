import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { Role } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    updateRole(id: number, newRole: Role): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findOne(id: number): Promise<{
        saves: ({
            book: {
                id: number;
                title: string;
                description: string | null;
                routepdf: string;
                routeimg: string | null;
                createAt: Date;
                updateAt: Date;
            };
        } & {
            id: number;
            userId: number;
            saveeAt: Date;
            createdAt: Date;
            updatedAt: Date;
            bookId: number;
        })[];
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
