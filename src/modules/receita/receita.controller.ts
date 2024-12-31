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
import { ReceitaService } from './receita.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';

@UseGuards(AuthGuard)
@Controller('receita')
export class ReceitaController {
    constructor(private readonly receitaService: ReceitaService) {}

    @Post()
    create(@Body() data: CreateReceitaDto) {
        return this.receitaService.create(data);
    }

    @Get()
    async findAll(        
        @Query('mes') mes?: string,
        @Query('ano') ano?: string,       
    ) {
        return this.receitaService.findAll({ mes, ano});
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCreditoDto: UpdateReceitaDto,
    ) {
        return this.receitaService.update(id, updateCreditoDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.receitaService.remove(id);
    }    
}
