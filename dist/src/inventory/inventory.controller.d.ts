import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: CreateInventoryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInventoryDto: any): string;
    remove(id: string): string;
}
