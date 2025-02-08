import { Module } from '@nestjs/common';
import { CreditoService } from './credito.service';
import { CreditoController } from './credito.controller';
import { PrismaService } from '../../database/PrismaService';
import { SecretsService } from 'src/database/SecretService';

@Module({
    controllers: [CreditoController],
    providers: [CreditoService, PrismaService, SecretsService],
})
export class CreditoModule {}
