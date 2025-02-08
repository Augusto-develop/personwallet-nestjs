import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { PrismaService } from '../../database/PrismaService';
import { SecretsService } from 'src/database/SecretService';

@Module({
    controllers: [CategoriaController],
    providers: [CategoriaService, PrismaService, SecretsService],
})
export class CategoriaModule {}
