import { UsersService } from './user.service';
import { CreateUserDto, Role } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
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
            saveeAt: Date;
            bookId: number;
            userId: number;
        })[];
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
    updateRole(id: number, role: Role): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
}
