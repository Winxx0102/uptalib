import { PrismaService } from '../../prisma/prisma.service';
export declare class BookService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }[]>;
    create(data: {
        title: string;
        description?: string;
        routepdf: string;
        routeimg?: string;
    }): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    saveToUser(userId: number, bookId: number): Promise<{
        id: number;
        userId: number;
        saveeAt: Date;
        bookId: number;
    }>;
    getSavedBook(userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }[]>;
}
