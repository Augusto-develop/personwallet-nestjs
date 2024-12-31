import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateReceitaDto } from './create-receita.dto';

export class UpdateReceitaDto extends OmitType(PartialType(CreateReceitaDto), [
    'id',
] as const) {}
