import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateDespesaDto } from './dto/create-despesa.dto';

@UseGuards(AuthGuard)
@Controller('despesa')
export class DespesaController {
    constructor(private readonly despesaService: DespesaService) {}

    @Post()
    create(@Body() data: CreateDespesaDto) {
        return this.despesaService.create(data);
    }

    @Get()
    async findAll(
        @Query('creditId') creditId?: string,
        @Query('mesfat') mesfat?: string,
        @Query('anofat') anofat?: string,
    ) {
        return this.despesaService.findAll({ creditId, mesfat, anofat });
    }

    // @Put()
    // update(@Body() despesa: DespesaDto) {
    //     this.despesaService.update(despesa);
    // }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.despesaService.remove(id);
    }

    @Delete('/parcelas/:id')
    removeParcelas(@Param('id') id: string) {
        return this.despesaService.removeParcelas(id);
    }

    @Post('/parcelas')
    async createParcelas(@Body('id') id: string) {
        return await this.despesaService.createParcelas(id); // Chama o serviço para criar as parcelas
    }
}
