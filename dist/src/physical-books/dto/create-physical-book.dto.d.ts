import { BookStatus, Pnf } from "@prisma/client";
export declare class CreatePhysicalBookDto {
    isbn: string;
    title: string;
    yearOfPublication: number;
    authorId: string;
    categoryId: string;
    pnf: Pnf;
    editorial: string;
    totalStock: number;
    availableStock: number;
    status: BookStatus;
    authorName: string;
    categoryName: string;
}
