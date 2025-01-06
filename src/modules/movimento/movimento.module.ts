import { Module } from '@nestjs/common';
import { MovimentoController } from './movimento.controller';
import { MovimentoService } from './movimento.service';
import { PrismaService } from '../../database/PrismaService';

@Module({
    controllers: [MovimentoController],
    providers: [MovimentoService, PrismaService]
})
export class MovimentoModule { }
