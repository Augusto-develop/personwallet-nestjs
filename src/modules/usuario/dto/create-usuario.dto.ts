import { IsDate, IsEmail, IsOptional, IsString, IsUUID, Length, MaxLength, MinLength } from "class-validator";
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @Length(3, 50)
    name: string;

    @IsEmail()
    @Length(10, 100)
    email: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    emailVerifiedAt?: Date;

    @IsString()
    @Length(1, 255)
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