import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Autenticação')
@ApiBearerAuth() // Aplica Bearer Auth
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Exemplo protegido por JWT' })
    async signIn(
        @Body('email') email: string,
        @Body('password') password: string
    ): Promise<AuthResponseDto> {
        return await this.authService.signIn(email, password);
    }
}
