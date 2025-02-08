import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../../database/PrismaService';
import { SecretsService } from 'src/database/SecretService';

@Module({
  controllers: [UsuarioController],
  exports: [UsuarioService],
  providers: [UsuarioService, PrismaService, SecretsService]
})
export class UsuarioModule { }
