import { Module } from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CarteiraController } from './carteira.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
    controllers: [CarteiraController],
    providers: [CarteiraService, PrismaService],
})
export class CarteiraModule {}
