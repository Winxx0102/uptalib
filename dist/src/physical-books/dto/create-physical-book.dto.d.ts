import { Pnf } from "@prisma/client";
export declare class CreatePhysicalBookDto {
    title: string;
    isbn?: string;
    yearOfPublication: number;
    authorId: string;
    categoryId: string;
    pnf: Pnf;
    editorial: string;
    totalStock: number;
}
