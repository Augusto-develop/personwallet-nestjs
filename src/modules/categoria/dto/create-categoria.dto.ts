import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateCategoriaDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    descricao: string;

    @IsUUID()
    @IsOptional()
    userId: string;
}
