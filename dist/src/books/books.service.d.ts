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
        data: {
            id: number;
            title: string;
            description: string | null;
            routepdf: string;
            routeimg: string | null;
            createAt: Date;
            updateAt: Date;
        }[];
        totalPages: number;
    }>;
    create(data: any, req: any): Promise<{
        message: string;
    }>;
    delete(id: number, req: any): Promise<{
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
    edit(id: number, data: bookUpdate, req: any): Promise<{
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
        message: string;
        data: {
            id: number;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            saveeAt: Date;
            bookId: number;
        };
    }>;
    removeFromUser(userId: number, bookId: number): Promise<{
        message: string;
        data: {
            id: number;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            saveeAt: Date;
            bookId: number;
        }[];
    }>;
    getVerifyLike(userId: any, bookId: any): Promise<boolean>;
    getSavedBooks(userId: number, query: any): Promise<{
        data: ({
            book: {
                id: number;
                title: string;
                description: string | null;
                routepdf: string;
                routeimg: string | null;
                createAt: Date;
                updateAt: Date;
            };
        } & {
            id: number;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            saveeAt: Date;
            bookId: number;
        })[];
        totalPages: number;
    }>;
}
export {};
