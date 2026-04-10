import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        status: string;
        message: string;
    }>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
