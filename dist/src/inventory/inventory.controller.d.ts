import { InventoryService } from './inventory.service';
import { CreateItemInventory } from './dto/create-item-dto';
import { EditItemInventory } from './dto/edit-item-dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: CreateItemInventory): Promise<{
        item: {
            name: string;
            description: string | null;
            stock: number;
            id: number;
        };
        message: string;
    }>;
    findAll(query: any): Promise<{
        name: string;
        description: string | null;
        stock: number;
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
