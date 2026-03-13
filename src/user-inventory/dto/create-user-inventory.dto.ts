import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class CreateUserInventoryDto {


@IsNotEmpty()
@IsString()
name: string;


@IsNotEmpty()
@IsString()
lastname: string;


@IsNotEmpty()
@IsNumber()

cedula: number;









}

