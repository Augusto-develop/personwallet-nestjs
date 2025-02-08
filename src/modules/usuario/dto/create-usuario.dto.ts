import { IsDate, IsEmail, IsOptional, IsString, IsUUID, Length, MaxLength, MinLength } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @IsUUID()
    @IsOptional()    
    id?: string;

    @IsString()
    @Length(3, 50)
    @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
    name: string;

    @IsEmail()
    @Length(10, 100)
    @ApiProperty({ description: 'E-mail do usuário', example: 'joao@email.com' })
    email: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    emailVerifiedAt?: Date;

    @IsString()
    @Length(1, 255)
    @ApiProperty({ description: 'Senha do usuário', example: '123456', minLength: 6 })
    password: string;

    @IsOptional()
    @IsString()
    @Length(0, 255)
    rememberToken?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;
}