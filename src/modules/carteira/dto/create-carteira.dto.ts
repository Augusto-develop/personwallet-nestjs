import { Emissor } from "@prisma/client";
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarteiraDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty({ description: 'Descrição da Carteira', example: 'Conta Corrente' })
    descricao: string;

    @IsEnum(Emissor)
    @ApiProperty({ description: 'Emissor da Carteira', example: 'Santander' })
    emissor: Emissor;

    @IsOptional()
    @ApiPropertyOptional({
        description: 'Status da Carteira ',
        example: 'true=Ativo | false=Inativo'
    })
    ativo: boolean;

    @IsOptional()
    @IsUUID()
    userId?: string;
}