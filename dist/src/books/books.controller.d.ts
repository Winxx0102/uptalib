import { BookService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    findAll(): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }[]>;
    create(data: CreateBookDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        routepdf: string;
        routeimg: string | null;
        createAt: Date;
        updateAt: Date;
    }>;
    save(req: any, bookId: number): Promise<{
        id: number;
        saveeAt: Date;
        bookId: number;
        userId: number;
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
