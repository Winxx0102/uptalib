import { UserInventoryService } from "./user-inventory.service";
import { CreateUserInventoryDto } from "./dto/create-user-inventory.dto";
export declare class UserInventoryController {
    private readonly userInventoryService;
    constructor(userInventoryService: UserInventoryService);
    create(createUserInventoryDto: CreateUserInventoryDto): Promise<{
        id: number;
        name: string;
        lastname: string;
        cedula: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        lastname: string;
        cedula: number;
    }[]>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        lastname: string;
        cedula: number;
    }>;
}
