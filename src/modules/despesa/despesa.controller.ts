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
import { DespesaService } from './despesa.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

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
        @Query('type') type?: string,
    ) {
        return this.despesaService.findAll({ creditId, mesfat, anofat, type });
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCreditoDto: UpdateDespesaDto,
    ) {
        return this.despesaService.update(id, updateCreditoDto);
    }

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

    @Post('/fixas')
    async createDespesasFixas(        
        @Body('mesfat') mesfat: string,
        @Body('anofat') anofat: string,
    ) {
        return await this.despesaService.createDespesasFixas(mesfat, anofat); // Chama o serviço para criar as parcelas
    }
}
