import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class CategoriaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateCategoriaDto) {
        const categoriaExists = await this.prisma.categoria.findFirst({
            where: {
                descricao: data.descricao,
            },
        });

        if (categoriaExists) {
            throw new Error('Categoria already exists');
        }

        const categoria = await this.prisma.categoria.create({
            data,
        });

        return categoria;
    }

    findAll() {
        return this.prisma.categoria.findMany();
    }

    findOne(id: string) {
        return `This action returns a #${id} categoria`;
    }

    async update(id: string, data: UpdateCategoriaDto) {
        const categoriaExists = await this.prisma.categoria.findUnique({
            where: {
                id,
            },
        });

        if (!categoriaExists) {
            throw new Error('Categoria does not exists!');
        }

        return await this.prisma.categoria.update({
            data,
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<string> {
        // Verificar se o registro existe
        const categoriaExists = await this.prisma.categoria.findUnique({
            where: {
                id,
            },
        });

        // Caso não exista, lançar um erro
        if (!categoriaExists) {
            throw new Error('Categoria does not exist!');
        }

        // Excluir o registro
        await this.prisma.categoria.delete({
            where: {
                id,
            },
        });

        return `Categoria with ID ${id} has been removed.`;
    }
}
