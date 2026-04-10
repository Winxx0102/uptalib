import { UsersService } from './user.service';
import { CreateUserDto, Role } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getProfile(userId: number): Promise<{
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
    updateRole(id: number, role: Role): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
