import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid, validate } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { PrismaService } from '../../database/PrismaService';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entity/usuario.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsuarioService {   

    constructor(private prisma: PrismaService) {}

    async create(newUsuario: CreateUsuarioDto) {

        const usuarioEntity  = plainToClass(Usuario, newUsuario);
        
        usuarioEntity.id = uuid();
        usuarioEntity.password = bcryptHashSync(usuarioEntity.password, 10);  

        const usarioExists = await this.findByUsuarioEmail(usuarioEntity.email);
    
        if (usarioExists) {
            throw new HttpException(`User with email ${usuarioEntity.email} already exists`, HttpStatus.CONFLICT);        }

        const usuario = await this.prisma.user.create({
            data: usuarioEntity
        }); 
        
        return usuario;
    }

    async findByUsuarioEmail(email: string): Promise<Usuario | null> {
        return this.prisma.user.findUnique({
          where: {
            email,
          },
        });
      }
}
