import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalBookOperationDto } from './create-physical-book-operation.dto';

export class UpdatePhysicalBookOperationDto extends PartialType(CreatePhysicalBookOperationDto) {}
