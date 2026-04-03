import { CreateUserInventoryDto } from './dto/create-user-inventory.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class UserInventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserInventoryDto: CreateUserInventoryDto): Promise<{
        id: number;
        name: string;
        lastname: string;
        cedula: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        lastname: string;
        cedula: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        lastname: string;
        cedula: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        lastname: string;
        cedula: number;
    }>;
}
