import { Module } from '@nestjs/common';
import { DespesaController } from './despesa.controller';
import { DespesaService } from './despesa.service';
import { PrismaService } from '../../database/PrismaService';

@Module({
    controllers: [DespesaController],
    providers: [DespesaService, PrismaService]
})
export class DespesaModule { }
