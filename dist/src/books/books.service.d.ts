import { PrismaService } from '../../prisma/prisma.service';
interface bookUpdate {
    title?: string;
    description?: string;
    routepdf?: string;
    routeimg?: string;
}
export declare class BookService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    findAll(query: any): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }[]>;
    create(data: any): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        book: {
            id: number;
            title: string;
            description: string | null;
            routepdf: string;
            routeimg: string | null;
            createAt: Date;
            updateAt: Date;
        };
        message: string;
    }>;
    edit(id: number, data: bookUpdate): Promise<{
        book: {
            id: number;
            title: string;
            description: string | null;
            routepdf: string;
            routeimg: string | null;
            createAt: Date;
            updateAt: Date;
        };
        message: string;
    }>;
    saveToUser(userId: number, bookId: number): Promise<{
        id: number;
        saveeAt: Date;
        bookId: number;
        userId: number;
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
export {};
