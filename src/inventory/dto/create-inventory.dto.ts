import { ItemStatus } from "@prisma/client"
import { Transform } from "class-transformer"
import { IsDefined, IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator"

export class CreateInventoryDto {

    @Transform(({ value }: any) => parseInt(value))
    @IsInt({ message: 'La cantidad debe ser un numero entero' })
    @IsPositive({ message: 'La cantidad debe ser un numero positivo' })
    stock: number


    @IsString({ message: 'El nombre debe ser texto' })
    @MaxLength(20, { message: 'El nombre debe tener un máximo de 20 caracteres' })
    @MinLength(3, { message: 'El nombre debe tener minimo 3 caracteres' })
    name: string

    @IsDefined({ message: 'Necesitas seleccionar un tipo' })
    typeId: string

    @IsOptional()
    @IsString({ message: 'El codigo debe ser cadena de texto' })
    code?: string

    @IsString({ message: 'La descripcion debe ser texto' })
    @IsOptional()
    @MinLength(200, { message: 'La descripcion debe tener un maximo de 200 caracteres' })
    description?: string





}
