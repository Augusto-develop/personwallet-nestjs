import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcryptjs';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    async signIn(email: string, password: string): Promise<AuthResponseDto> {
        const foundUsuario = await this.usuarioService.findByUsuarioEmail(email);

        if (!foundUsuario) {
            throw new Error('Usuario not exists');
        }

        if (!foundUsuario || !bcryptCompareSync(password, foundUsuario.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundUsuario.id, username: foundUsuario.name };

        console.log(payload);

        const token = this.jwtService.sign(payload);

        return {
            token,
            expiresIn: this.jwtExpirationTimeInSeconds,
            id: foundUsuario.id,
            name: foundUsuario.name,
        };
    }
}
