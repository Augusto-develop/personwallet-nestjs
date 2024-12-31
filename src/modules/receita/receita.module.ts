import { Module } from '@nestjs/common';
import { ReceitaController } from './receita.controller';
import { ReceitaService } from './receita.service';
import { PrismaService } from '../../database/PrismaService';

@Module({
    controllers: [ReceitaController],
    providers: [ReceitaService, PrismaService]
})
export class ReceitaModule { }
