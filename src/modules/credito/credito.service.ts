import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { PrismaService } from '../../database/PrismaService';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class CreditoService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateCreditoDto) {
        const creditoExists = await this.prisma.credit.findFirst({
            where: {
                descricao: data.descricao,
            },
        });

        if (creditoExists) {
            throw new Error('Credito already exists');
        }

        const credito = await this.prisma.credit.create({
            data,
        });

        return credito;
    }

    async findAll(filters?: { type?: string }) {
        const where: any = {};

        if (filters?.type) {
            where.type = filters.type;
        }

        return this.prisma.credit.findMany({
            where,
            orderBy: { diavenc: 'asc' },
        });
    }

    findOne(id: string) {
        return `This action returns a #${id} credito`;
    }

    async update(id: string, data: UpdateCreditoDto) {
        const creditoExists = await this.prisma.credit.findUnique({
            where: {
                id,
            },
        });

        if (!creditoExists) {
            throw new Error('Credito does not exists!');
        }

        return await this.prisma.credit.update({
            data,
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<string> {
        // Verificar se o registro existe
        const creditoExists = await this.prisma.credit.findUnique({
            where: {
                id,
            },
        });

        // Caso não exista, lançar um erro
        if (!creditoExists) {
            throw new Error('Credito does not exist!');
        }

        // Excluir o registro
        await this.prisma.credit.delete({
            where: {
                id,
            },
        });

        return `Credito with ID ${id} has been removed.`;
    }
}
