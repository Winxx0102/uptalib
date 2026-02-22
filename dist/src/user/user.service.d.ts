import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { Role } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
    updateRole(id: number, newRole: Role): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
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
            saveeAt: Date;
            bookId: number;
            userId: number;
        })[];
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
}
