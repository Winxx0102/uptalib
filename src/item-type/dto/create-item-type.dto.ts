import { IsString, MinLength } from "class-validator";

export class CreateItemTypeDto {

    @IsString({ message: 'El tipo debe ser una cadena de texto' })
    @MinLength(3, { message: 'El tipo debe tener como minimo 3 caracteres de longitud' })
    name: string

}
