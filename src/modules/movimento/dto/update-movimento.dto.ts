import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMovimentoDto } from './create-movimento.dto';

export class UpdateMovimentoDto extends OmitType(PartialType(CreateMovimentoDto), [
    'id',
] as const) { }
