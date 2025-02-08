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

export class CreateDespesaDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsUUID()
    @IsOptional()
    creditId?: string;

    @IsUUID()
    categoriaId: string;

    @IsString()
    @MinLength(4)
    @MaxLength(4)
    anofat: string;

    @IsString()
    @MinLength(2)
    @MaxLength(2)
    mesfat: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    descricao: string;

    @IsInt()
    numparc: number;

    @IsInt()
    qtdeparc: number;

    @IsDateString()
    lancamento: string;

    @IsDecimal()
    valor: Decimal;

    @IsBoolean()
    generateparc: boolean;

    @IsOptional()
    parentId?: string;

    @IsOptional()
    carteiraPg?: string;

    @IsUUID()   
    userId: string;
}
