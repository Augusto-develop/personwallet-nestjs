import { Decimal } from '@prisma/client/runtime/library';
import {
    IsDate,
    IsDecimal,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';
import { Bandeira, Emissor, TypeCredit } from '@prisma/client';

export class CreateCreditoDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @Length(3, 30)
    descricao: string;

    @IsOptional()
    @IsEnum(TypeCredit)
    type?: TypeCredit;

    @IsString()
    @Length(2, 2)
    @IsOptional()
    diavenc?: string;

    @IsString()
    @Length(2, 2)
    @IsOptional()
    diafech?: string;
   
    @IsOptional()
    @IsEnum(Emissor)
    emissor?: Emissor;

    @IsOptional()
    @IsEnum(Bandeira)
    bandeira?: Bandeira;

    @IsDecimal()    
    @IsOptional()
    valorcredito?: Decimal;

    @IsUUID()
    @IsOptional()
    categoriaId?: string;

    // @IsUUID()   
    // userId: string;
}
