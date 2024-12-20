import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends OmitType(
    PartialType(CreateCategoriaDto),
    ['id'] as const,
) {}
