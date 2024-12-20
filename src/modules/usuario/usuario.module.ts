import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [UsuarioController],
  exports: [UsuarioService],
  providers: [UsuarioService, PrismaService]
})
export class UsuarioModule { }
