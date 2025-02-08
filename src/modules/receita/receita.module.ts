import { Module } from '@nestjs/common';
import { ReceitaController } from './receita.controller';
import { ReceitaService } from './receita.service';
import { PrismaService } from '../../database/PrismaService';
import { SecretsService } from 'src/database/SecretService';

@Module({
    controllers: [ReceitaController],
    providers: [ReceitaService, PrismaService, SecretsService]
})
export class ReceitaModule { }
