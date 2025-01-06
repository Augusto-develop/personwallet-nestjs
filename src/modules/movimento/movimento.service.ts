import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';
import dayjs from 'dayjs';

@Injectable()
export class MovimentoService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateMovimentoDto) {
        const movimento = await this.prisma.movimento.create({
            data,
        });

        return movimento;
    }

    async createPagamento(data: CreateMovimentoDto) {
        const movimento = await this.prisma.movimento.create({
            data,
        });

        return this.findAll({ mes: movimento.mesfat, ano: movimento.anofat, creditId: movimento.creditId });
    }

    async findAll(filters?: {
        mes?: string;
        ano?: string;
        creditId?: string;
    }) {
        const where: any = {};

        if (filters?.mes && filters?.ano) {
            const { mes, ano } = filters;

            // Cria o primeiro e o último dia do mês
            const primeiroDia = dayjs(`${ano}-${mes}-01`).startOf('month').toDate();
            const ultimoDia = dayjs(`${ano}-${mes}-01`).endOf('month').toDate();

            // Define o filtro BETWEEN
            where.ocorrencia = {
                gte: primeiroDia,
                lte: ultimoDia,
            };
        }

        // Adiciona o filtro por creditId, se estiver presente
        if (filters?.creditId) {
            where.creditId = filters.creditId;
        }

        return this.prisma.movimento.findMany({
            where,
        });
    }


    async update(id: string, data: UpdateMovimentoDto) {
        const movimentoExists = await this.prisma.movimento.findUnique({
            where: {
                id,
            },
        });

        if (!movimentoExists) {
            throw new Error('Movimento does not exists!');
        }

        return await this.prisma.movimento.update({
            data,
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<string> {
        // Verificar se o registro existe
        const movimentoExists = await this.prisma.movimento.findUnique({
            where: {
                id,
            },
        });

        // Caso não exista, lançar um erro
        if (!movimentoExists) {
            throw new Error('Movimento does not exist!');
        }

        await this.prisma.movimento.delete({
            where: { id },
        });

        return `Movimento with ID ${id} has been removed.`;
    }
}