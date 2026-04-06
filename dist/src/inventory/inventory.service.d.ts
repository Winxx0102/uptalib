import { PrismaService } from 'prisma/prisma.service';
import { EditItemInventory } from './dto/edit-item-dto';
export declare class InventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createInventoryDto: any): Promise<{
        item: {
            name: string;
            description: string | null;
            stock: number;
            routeimg: string | null;
            id: number;
        };
        message: string;
    }>;
    findAll(query: any): Promise<{
        name: string;
        description: string | null;
        stock: number;
        routeimg: string | null;
        id: number;
    }[]>;
    findOne(id: number): string;
    edit(id: number, updateInventoryDto: EditItemInventory): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
