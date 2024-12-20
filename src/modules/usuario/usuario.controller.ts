import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';


@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
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
