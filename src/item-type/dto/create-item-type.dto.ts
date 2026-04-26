import { IsString, MinLength } from "class-validator";

export class CreateItemTypeDto {

    @IsString()
    @MinLength(3)
    name: string

}
