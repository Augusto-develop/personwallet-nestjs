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

export class CreateCreditoDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @Length(3, 30)
    descricao: string;

    @IsEnum(['CARTAO', 'EMPRESTIMO', 'FINANCIAMENTO', 'DESPESAFIXA'])
    type: 'CARTAO' | 'EMPRESTIMO' | 'FINANCIAMENTO' | 'DESPESAFIXA';

    @IsString()
    @Length(2, 2)
    diavenc: string;

    @IsString()
    @Length(2, 2)
    @IsOptional()
    diafech?: string;

    @IsOptional()
    @IsEnum([
        'ITAU',
        'BRADESCO',
        'BANCOBRASIL',
        'SANTANDER',
        'CAIXA',
        'NUBANK',
        'MERCADOPAGO',
        'ATACADAO',
        'NOVUCARD',
        'OUZE',
        'RIACHUELO',
        'BRASILCARD',
        'NEON',
    ])
    emissor?:
        | 'ITAU'
        | 'BRADESCO'
        | 'BANCOBRASIL'
        | 'SANTANDER'
        | 'CAIXA'
        | 'NUBANK'
        | 'MERCADOPAGO'
        | 'ATACADAO'
        | 'NOVUCARD'
        | 'OUZE'
        | 'RIACHUELO'
        | 'BRASILCARD'
        | 'NEON';

    @IsOptional()
    @IsEnum(['VISA', 'MASTERCARD'])
    bandeira?: 'VISA' | 'MASTERCARD';

    @IsDecimal()    
    @IsOptional()
    valorcredito: Decimal;
}
