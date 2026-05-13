import { PartialType } from "@nestjs/swagger";
import { EntrieDto } from "./entrie-dto";
import { IsDefined } from "class-validator";

export class DropDto extends PartialType(EntrieDto) {
    @IsDefined({ message: 'Debes incluir un libro para dar bajas' })
    bookId: string

}