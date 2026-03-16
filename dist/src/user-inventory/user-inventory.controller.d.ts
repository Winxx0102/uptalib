import { UserInventoryService } from "./user-inventory.service";
import { CreateUserInventoryDto } from "./dto/create-user-inventory.dto";
export declare class UserInventoryController {
    private readonly userInventoryService;
    constructor(userInventoryService: UserInventoryService);
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
    remove(id: string): Promise<{
        name: string;
        lastname: string;
        cedula: number;
        id: number;
    }>;
}
