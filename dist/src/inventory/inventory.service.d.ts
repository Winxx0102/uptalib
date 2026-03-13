import { CreateInventoryDto } from './dto/create-inventory.dto';
export declare class InventoryService {
    create(createInventoryDto: CreateInventoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInventoryDto: any): string;
    remove(id: number): string;
}
