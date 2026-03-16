import { PartialType } from "@nestjs/swagger";
import { CreateItemInventory } from "./create-item-dto";

export class EditItemInventory extends PartialType(CreateItemInventory) {

}