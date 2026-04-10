import { Author, BookStatus, Category, Pnf } from "@prisma/client";
import { IsIn, IsInt, IsOptional, isString, IsString, MinLength, minLength } from "class-validator";

export class CreatePhysicalBookDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    isbn: string

    @IsString()
    title: string

    @IsInt()
    yearOfPublication: number

    @IsString()
    authorId: string

    @IsString()
    categoryId: string

    @IsString()
    pnf: Pnf

    @IsString()
    editorial: string

    @IsInt()
    totalStock: number

    @IsInt()
    @IsOptional()
    availableStock: number


    @IsString()
    @IsOptional()
    status: BookStatus


    @IsOptional()
    @IsString()
    authorName: string


    @IsOptional()
    @IsString()
    categoryName: string




}
