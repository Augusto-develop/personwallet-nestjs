import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { CreditoService } from './credito.service';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('credito')
@ApiTags('Créditos')
@ApiBearerAuth()
export class CreditoController {
    constructor(private readonly creditoService: CreditoService) {}

    @Post()
    create(@Body() data: CreateCreditoDto) {
        return this.creditoService.create(data);
    }

    @Get('/cartoes')
    async findCreditCard() {
        return this.creditoService.getCreditCardLimits();
    }

    @Get('/faturas')
    async findInvoice(        
        @Query('mesfat') mesfat?: string,
        @Query('anofat') anofat?: string       
    ) {
        return this.creditoService.getCreditWithInvoices({mesfat, anofat});
    }

    @Get()
    async findAll(@Query('type') type?: string) {
        return this.creditoService.findAll({ type });
    }    

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.creditoService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCreditoDto: UpdateCreditoDto,
    ) {
        return this.creditoService.update(id, updateCreditoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.creditoService.remove(id);
    }
}
