import { OperationType } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, isString, IsString } from "class-validator";

export class MakeLoanDto {
    @IsString()
    bookId: string

    // @IsString()
    // type: OperationType

    @Transform(({ value }: any) => parseInt(value))
    @IsInt()
    quantity: number

    @IsString()
    @IsOptional()
    observations: string

    @IsString()
    personId: string

    @IsString()
    personNames: string

    @IsString()
    personSurNames: string

}