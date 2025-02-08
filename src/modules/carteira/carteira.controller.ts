import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation, ApiExtraModels } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('carteira')
@ApiTags('Carteiras')
@ApiBearerAuth()
@ApiExtraModels(UpdateCarteiraDto)
export class CarteiraController {
  constructor(private readonly carteiraService: CarteiraService) { }

  @Post()
  @ApiBody({ type: CreateCarteiraDto }) // Relaciona o DTO com o Swagger
  create(@Body() data: CreateCarteiraDto) {
    return this.carteiraService.create(data);
  }

  @Get()
  findAll(@Req() request: any) {
    const userId = request.user?.sub; // ID do usuário extraído do token
    console.log(userId);
    return this.carteiraService.findAll();
  }

  @Get('/saldo')
  calcSaldo() {
    return this.carteiraService.calcularSaldoPorCarteira();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carteiraService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCarteiraDto }) // Relaciona o DTO com o Swagger
  @ApiOperation({ summary: 'Atualizar uma carteira' })
  update(@Param('id') id: string, @Body() updateCarteiraDto: UpdateCarteiraDto) {
    return this.carteiraService.update(id, updateCarteiraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carteiraService.remove(id);
  }
}
