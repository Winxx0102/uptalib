import { Author, BookStatus, Category, Pnf } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, isString, IsString, MinLength, minLength } from "class-validator";

export class CreatePhysicalBookDto {

    @IsString()
    @MinLength(3)
    title: string;

    @IsOptional()
    @IsString()
    isbn: string;


    @IsInt()
    @Transform(({ value }: any) => parseInt(value))
    yearOfPublication: number;

    @IsString()
    authorId: string;

    @IsString()
    categoryId: string;

    @IsString()
    pnf: Pnf;

    @IsString()
    editorial: string;

    @IsInt()
    @Transform(({ value }: any) => parseInt(value))
    totalStock: number;

    @IsInt()
    @IsOptional()
    availableStock: number;


    @IsString()
    @IsOptional()
    status: BookStatus;


    @IsOptional()
    @IsString()
    authorName: string;


    @IsOptional()
    @IsString()
    categoryName: string;




}
