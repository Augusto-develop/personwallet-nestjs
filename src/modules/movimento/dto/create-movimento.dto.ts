import { Decimal } from '@prisma/client/runtime/library';
import {
    IsDateString,
    IsDecimal,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateMovimentoDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsUUID()
    cartdebito: string;

    @IsUUID()
    @IsOptional()
    cartcredito?: string;

    @IsDateString()
    ocorrencia: string;

    @IsDecimal()
    valor: Decimal;

    @IsUUID()
    @IsOptional()
    creditId?: string;

    @IsString()
    @MaxLength(4)
    @IsOptional()
    anofat?: string;

    @IsString()
    @MaxLength(2)
    @IsOptional()
    mesfat?: string;
}
