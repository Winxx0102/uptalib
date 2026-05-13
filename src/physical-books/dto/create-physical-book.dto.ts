import { Author, BookStatus, Category, Pnf } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsDefined, IsIn, IsInt, IsOptional, IsPositive, isString, IsString, MinLength, minLength } from "class-validator";

export class CreatePhysicalBookDto {

    @IsString({ message: 'El titulo del libro debe ser una cadena de texto' })
    @MinLength(3, { message: 'El nombre del libro debe tener minimo 3 caracteres' })
    title: string;

    @IsOptional()
    @IsString({ message: 'El codigo isbn debe ser cadena de texto' })
    isbn?: string;

    @Transform(({ value }: any) => parseInt(value))
    @IsInt({ message: 'El año de publicación debe ser un número entero' })
    @IsPositive({ message: 'El año de publicación debe ser un número positivo' })
    yearOfPublication: number;

    @IsString()
    @IsDefined({ message: 'Debes incluir un autor de libro' })
    authorId: string;

    @IsString({ message: 'Debes incluir un genero literario del libro' })
    categoryId: string;

    @IsString()
    @IsDefined({ message: 'Debes incluir un PNF' })
    pnf: Pnf;

    @IsString()
    @MinLength(3, { message: 'La editorial debe tener un minimo de 3 caracteres' })
    @IsDefined({ message: 'Debes incluir una editorial' })
    editorial: string;

    @Transform(({ value }: any) => parseInt(value))
    @IsInt()
    @IsPositive({ message: 'El stock debe ser un numero positivo' })
    totalStock: number;





}
