import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateDespesaDto } from './create-despesa.dto';

export class UpdateDespesaDto extends OmitType(PartialType(CreateDespesaDto), [
    'id',
] as const) {}
