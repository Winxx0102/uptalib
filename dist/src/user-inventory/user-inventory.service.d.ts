import { CreateUserInventoryDto } from './dto/create-user-inventory.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class UserInventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserInventoryDto: CreateUserInventoryDto): Promise<{
        name: string;
        lastname: string;
        cedula: number;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        lastname: string;
        cedula: number;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        lastname: string;
        cedula: number;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        lastname: string;
        cedula: number;
        id: number;
    }>;
}
