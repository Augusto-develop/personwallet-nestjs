import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'src/database/PrismaService';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Injectable()
export class DespesaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDespesaDto) {
        const despesa = await this.prisma.despesa.create({
            data,
        });

        return despesa;
    }

    async findAll(filters?: {
        creditId?: string;
        mesfat?: string;
        anofat?: string;
    }) {
        const where: any = {};

        if (filters?.creditId) {
            where.creditId = filters.creditId;
        }

        if (filters?.mesfat) {
            where.mesfat = filters.mesfat;
        }

        if (filters?.anofat) {
            where.anofat = filters.anofat;
        }

        return this.prisma.despesa.findMany({ where });
    }

    async update(id: string, data: UpdateDespesaDto) {
        const despesaExists = await this.prisma.despesa.findUnique({
            where: {
                id,
            },
        });

        if (!despesaExists) {
            throw new Error('Despesa does not exists!');
        }

        return await this.prisma.despesa.update({
            data,
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<string> {
        // Verificar se o registro existe
        const despesaExists = await this.prisma.despesa.findUnique({
            where: {
                id,
            },
        });

        // Caso não exista, lançar um erro
        if (!despesaExists) {
            throw new Error('Carteira does not exist!');
        }

        // Excluir o registro
        await this.prisma.despesa.delete({
            where: {
                id,
            },
        });

        return `Despesa with ID ${id} has been removed.`;
    }
}
