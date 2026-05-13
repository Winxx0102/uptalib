import { PartialType } from "@nestjs/swagger";
import { EntrieDto } from "./entrie-dto";
import { IsDefined } from "class-validator";

export class DropDto extends PartialType(EntrieDto) {
    @IsDefined({ message: 'Debes incluir un Item para dar bajas' })
    itemId: string

}