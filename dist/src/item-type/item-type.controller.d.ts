import { ItemTypeService } from './item-type.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
export declare class ItemTypeController {
    private readonly itemTypeService;
    constructor(itemTypeService: ItemTypeService);
    create(createItemTypeDto: CreateItemTypeDto): Promise<{
        message: string;
        status: string;
        data: {
            id: string;
            name: string;
        };
    }>;
    findAll(query: any): Promise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateItemTypeDto: UpdateItemTypeDto): Promise<{
        message: string;
        status: string;
        data: {
            id: string;
            name: string;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        status: string;
        data: {
            id: string;
            name: string;
        };
    }>;
}
