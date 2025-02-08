import { Module } from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CarteiraController } from './carteira.controller';
import { PrismaService } from '../../database/PrismaService';
import { SecretsService } from 'src/database/SecretService';

@Module({
    controllers: [CarteiraController],
    providers: [CarteiraService, PrismaService, SecretsService],
})
export class CarteiraModule {}
