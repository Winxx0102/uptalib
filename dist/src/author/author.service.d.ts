import { HttpException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthorService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAuthorDto: CreateAuthorDto): Promise<HttpException | {
        status: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: number): Promise<{
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
