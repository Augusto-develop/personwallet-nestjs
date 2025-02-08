import { Decimal } from '@prisma/client/runtime/library';
import {
    IsBoolean,
    IsDateString,
    IsDecimal,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateReceitaDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsUUID()
    carteiraId: string;

    @IsUUID()
    categoriaId: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    descricao: string;

    @IsDateString()
    datareceb: string;

    @IsDecimal()
    valor: Decimal;

    @IsUUID()   
    userId: string;
} 