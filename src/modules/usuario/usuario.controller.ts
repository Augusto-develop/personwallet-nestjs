import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ApiBearerAuth, ApiTags, ApiBody  } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('usuario')
@ApiTags('Usuarios')
@ApiBearerAuth()
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    @ApiBody({ type: CreateUsuarioDto }) // Relaciona o DTO com o Swagger
    create(@Body() usuario: CreateUsuarioDto) {
        return this.usuarioService.create(usuario);
    }

    // @Get('/:id')
    // findById(@Param('id') id: string): DespesaDto {
    //     return this.despesaService.findById(id);
    // }

    // @Get()
    // findAll(@Query() params: FindAllParemeters): DespesaDto[] {
    //     return this.despesaService.findAll(params);
    // }

    // @Put()
    // update(@Body() despesa: DespesaDto) {
    //     this.despesaService.update(despesa);
    // }

    // @Delete('/:id')
    // remove(@Param('id') id: string) {
    //     return this.despesaService.remove(id);
    // }
}
