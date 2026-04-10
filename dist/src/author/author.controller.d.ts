import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    create(createAuthorDto: CreateAuthorDto): Promise<import("@nestjs/common").HttpException | {
        status: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
