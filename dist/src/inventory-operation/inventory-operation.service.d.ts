import { CreateInventoryOperationDto } from './dto/create-inventory-operation.dto';
import { UpdateInventoryOperationDto } from './dto/update-inventory-operation.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class InventoryOperationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createInventoryOperationDto: CreateInventoryOperationDto): string;
    addDrops(entriesDto: any): Promise<{
        status: string;
        message: string;
    }>;
    addEntries(entriesDto: any): Promise<{
        status: string;
        message: string;
    }>;
    loan(itemLoan: any): Promise<{
        status: string;
        message: string;
    }>;
    settle(id: string): Promise<{
        status: string;
        message: string;
    }>;
    findAllLoans(query: any): Promise<{
        data: ({
            item: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                code: string | null;
                totalStock: number;
                availableStock: number;
                status: import(".prisma/client").$Enums.ItemStatus;
                typeId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.OperationType;
            quantity: number;
            observations: string | null;
            personId: string | null;
            wasSettled: boolean | null;
            personNames: string;
            personSurNames: string;
            itemId: string;
        })[];
        totalPages: number;
    }>;
    findAll(query: any): Promise<{
        data: ({
            item: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                code: string | null;
                totalStock: number;
                availableStock: number;
                status: import(".prisma/client").$Enums.ItemStatus;
                typeId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.OperationType;
            quantity: number;
            observations: string | null;
            personId: string | null;
            wasSettled: boolean | null;
            personNames: string;
            personSurNames: string;
            itemId: string;
        })[];
        totalPages: number;
    }>;
    findOne(id: number): string;
    update(id: number, updateInventoryOperationDto: UpdateInventoryOperationDto): string;
    remove(id: number): string;
}
