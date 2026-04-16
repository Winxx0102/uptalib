import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { UpdatePhysicalBookDto } from './dto/update-physical-book.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class PhysicalBooksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPhysicalBookDto: CreatePhysicalBookDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            isbn: string | null;
            yearOfPublication: number;
            authorId: string;
            categoryId: string;
            pnf: import(".prisma/client").$Enums.Pnf | null;
            editorial: string | null;
            totalStock: number;
            availableStock: number;
            status: import(".prisma/client").$Enums.BookStatus;
        };
    }>;
    findAll(query: any): import(".prisma/client").Prisma.PrismaPromise<({
        category: {
            id: string;
            name: string;
        };
        author: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        isbn: string | null;
        yearOfPublication: number;
        authorId: string;
        categoryId: string;
        pnf: import(".prisma/client").$Enums.Pnf | null;
        editorial: string | null;
        totalStock: number;
        availableStock: number;
        status: import(".prisma/client").$Enums.BookStatus;
    })[]>;
    findOne(id: number): string;
    update(id: string, updatePhysicalBookDto: UpdatePhysicalBookDto): Promise<{
        status: string;
        message: string;
        data: {
            difference: number;
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            isbn: string | null;
            yearOfPublication: number;
            authorId: string;
            categoryId: string;
            pnf: import(".prisma/client").$Enums.Pnf | null;
            editorial: string | null;
            totalStock: number;
            availableStock: number;
            status: import(".prisma/client").$Enums.BookStatus;
        };
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
