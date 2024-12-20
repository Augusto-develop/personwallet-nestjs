import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCreditoDto } from './create-credito.dto';

export class UpdateCreditoDto extends OmitType(PartialType(CreateCreditoDto), ['id'] as const) {}
