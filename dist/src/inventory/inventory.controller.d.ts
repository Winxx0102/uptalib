import { InventoryService } from './inventory.service';
import { EditItemInventory } from './dto/edit-item-dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: any, img: Express.Multer.File): Promise<{
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
