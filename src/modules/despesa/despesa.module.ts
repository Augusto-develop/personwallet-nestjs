import { Module } from '@nestjs/common';
import { DespesaController } from './despesa.controller';
import { DespesaService } from './despesa.service';
import { PrismaService } from '../../database/PrismaService';
import { SecretsService } from 'src/database/SecretService';

@Module({
    controllers: [DespesaController],
    providers: [DespesaService, PrismaService, SecretsService]
})
export class DespesaModule { }
