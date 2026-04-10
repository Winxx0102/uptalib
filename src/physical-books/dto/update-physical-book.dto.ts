import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalBookDto } from './create-physical-book.dto';

export class UpdatePhysicalBookDto extends PartialType(CreatePhysicalBookDto) {}
