import { BookService } from './books.service';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    findAll(query: any): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    create(data: any, file: Express.Multer.File): Promise<{
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
    edit(id: number, data: any, pdfFile: Express.Multer.File): Promise<{
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
    save(req: any, bookId: number): Promise<{
        id: number;
        userId: number;
        saveeAt: Date;
        createdAt: Date;
        updatedAt: Date;
        bookId: number;
    }>;
    getMyLibrary(req: any): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }[]>;
}
