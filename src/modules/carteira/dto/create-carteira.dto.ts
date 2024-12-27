import { Emissor } from "@prisma/client";
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateCarteiraDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    descricao: string;
   
    @IsEnum(Emissor)
    emissor: Emissor;
   
    @IsOptional()
    ativo: boolean;
}