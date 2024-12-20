import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { PrismaService } from '../../database/PrismaService';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class CarteiraService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateCarteiraDto) {
        const carteiraExists = await this.prisma.carteira.findFirst({
            where: {
                descricao: data.descricao,
            },
        });

        if (carteiraExists) {
            throw new Error('Carteira already exists');
        }

        const carteira = await this.prisma.carteira.create({
            data,
        });

        return carteira;
    }

    findAll() {
        return this.prisma.carteira.findMany();
    }

    findOne(id: string) {
        return `This action returns a #${id} carteira`;
    }

    async update(id: string, data: UpdateCarteiraDto) {
        const carteiraExists = await this.prisma.carteira.findUnique({
            where: {
                id,
            },
        });

        if (!carteiraExists) {
            throw new Error('Carteira does not exists!');
        }

        return await this.prisma.carteira.update({
            data,
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<string> {
        // Verificar se o registro existe
        const carteiraExists = await this.prisma.carteira.findUnique({
            where: {
                id,
            },
        });

        // Caso não exista, lançar um erro
        if (!carteiraExists) {
            throw new Error('Carteira does not exist!');
        }

        // Excluir o registro
        await this.prisma.carteira.delete({
            where: {
                id,
            },
        });

        return `Carteira with ID ${id} has been removed.`;
    }
}
