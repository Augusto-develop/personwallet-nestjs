import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
    controllers: [CategoriaController],
    providers: [CategoriaService, PrismaService],
})
export class CategoriaModule {}
