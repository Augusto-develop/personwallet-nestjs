import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCarteiraDto } from './create-carteira.dto';

export class UpdateCarteiraDto extends OmitType(PartialType(CreateCarteiraDto), ['id'] as const) {}
