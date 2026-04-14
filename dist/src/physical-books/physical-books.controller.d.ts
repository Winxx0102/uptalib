import { PhysicalBooksService } from './physical-books.service';
import { CreatePhysicalBookDto } from './dto/create-physical-book.dto';
import { UpdatePhysicalBookDto } from './dto/update-physical-book.dto';
export declare class PhysicalBooksController {
    private readonly physicalBooksService;
    constructor(physicalBooksService: PhysicalBooksService);
    create(createPhysicalBookDto: CreatePhysicalBookDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
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
        createdAt: Date;
        updatedAt: Date;
        title: string;
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
    findOne(id: string): string;
    update(id: string, updatePhysicalBookDto: UpdatePhysicalBookDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
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
