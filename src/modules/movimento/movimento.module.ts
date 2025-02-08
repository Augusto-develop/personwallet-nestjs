import { Module } from '@nestjs/common';
import { MovimentoController } from './movimento.controller';
import { MovimentoService } from './movimento.service';
import { PrismaService } from '../../database/PrismaService';
import { SecretsService } from 'src/database/SecretService';

@Module({
    controllers: [MovimentoController],
    providers: [MovimentoService, PrismaService, SecretsService]
})
export class MovimentoModule { }
