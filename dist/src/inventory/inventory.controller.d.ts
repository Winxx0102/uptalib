import { InventoryService } from './inventory.service';
import { EditItemInventory } from './dto/edit-item-dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: any, img: Express.Multer.File): Promise<{
        item: {
            id: number;
            name: string;
            description: string | null;
            routeimg: string | null;
            stock: number;
        };
        message: string;
    }>;
    findAll(query: any): Promise<{
        id: number;
        name: string;
        description: string | null;
        routeimg: string | null;
        stock: number;
    }[]>;
    findOne(id: number): string;
    edit(id: number, updateInventoryDto: EditItemInventory): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
