import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    @MinLength(3, { message: 'El nombre de la categoría debe tener como mínimo 3 carácteres' })
    @MaxLength(20, { message: 'El nombre de la categoría debe tener un máximo de 20 carácteres' })
    name: string
}
