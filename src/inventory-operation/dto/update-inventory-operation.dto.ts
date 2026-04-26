import { PartialType } from '@nestjs/swagger';
import { CreateInventoryOperationDto } from './create-inventory-operation.dto';

export class UpdateInventoryOperationDto extends PartialType(CreateInventoryOperationDto) {}
