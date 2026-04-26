import { InventoryOperationService } from './inventory-operation.service';
import { CreateInventoryOperationDto } from './dto/create-inventory-operation.dto';
import { UpdateInventoryOperationDto } from './dto/update-inventory-operation.dto';
export declare class InventoryOperationController {
    private readonly inventoryOperationService;
    constructor(inventoryOperationService: InventoryOperationService);
    addEntries(entriesDto: any): Promise<{
        status: string;
        message: string;
    }>;
    addDrops(entriesDto: any): Promise<{
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
    loan(itemLoan: any): Promise<{
        status: string;
        message: string;
    }>;
    settle(id: string): Promise<{
        status: string;
        message: string;
    }>;
    create(createInventoryOperationDto: CreateInventoryOperationDto): string;
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
    findOne(id: string): string;
    update(id: string, updateInventoryOperationDto: UpdateInventoryOperationDto): string;
    remove(id: string): string;
}
