import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('categoria')
@ApiTags('Categorias')
@ApiBearerAuth()
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Post()
    create(@Body() data: CreateCategoriaDto) {
        return this.categoriaService.create(data);
    }

    @Get()
    findAll() {
        return this.categoriaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriaService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoriaDto: UpdateCategoriaDto,
    ) {
        return this.categoriaService.update(id, updateCategoriaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriaService.remove(id);
    }
}
