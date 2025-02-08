import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCarteiraDto } from './create-carteira.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Emissor } from '@prisma/client';

export class UpdateCarteiraDto extends OmitType(
    PartialType(CreateCarteiraDto),
    ['id'] as const
) {
    
}
