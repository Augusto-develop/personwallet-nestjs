import { Module } from '@nestjs/common';
import { CreditoService } from './credito.service';
import { CreditoController } from './credito.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
    controllers: [CreditoController],
    providers: [CreditoService, PrismaService],
})
export class CreditoModule {}
