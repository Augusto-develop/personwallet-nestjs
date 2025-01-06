import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    Patch,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { MovimentoService } from './movimento.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';

@UseGuards(AuthGuard)
@Controller('movimento')
export class MovimentoController {
    constructor(private readonly movimentoService: MovimentoService) { }

    @Post()
    create(@Body() data: CreateMovimentoDto) {
        return this.movimentoService.create(data);
    }

    @Post('/pagamento')
    createPagamento(@Body() data: CreateMovimentoDto) {
        return this.movimentoService.createPagamento(data);
    }

    @Get()
    async findAll(
        @Query('mes') mes?: string,
        @Query('ano') ano?: string,
    ) {
        return this.movimentoService.findAll({ mes, ano });
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCreditoDto: UpdateMovimentoDto,
    ) {
        return this.movimentoService.update(id, updateCreditoDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.movimentoService.remove(id);
    }
}
