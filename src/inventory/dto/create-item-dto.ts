import { Transform } from "class-transformer";
import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class CreateItemInventory {
    @Transform(({ value }: any) => parseInt(value))
    @IsInt({ message: 'La cantidad debe ser un numero entero' })
    @IsPositive({ message: 'La cantidad debe ser un numero positivo' })
    stock: number

    @IsString({ message: 'El nombre debe ser texto' })
    @MinLength(3, { message: 'El nombre debe tener minimo 3 caracteres' })
    name: string

    @IsString({ message: 'El nombre debe ser texto' })
    @MinLength(3, { message: 'La cantidad debe tener minimo 3 caracteres' })
    description: string

}