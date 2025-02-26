import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import dayjs from 'dayjs';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ReceitaService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateReceitaDto) {
        const receita = await this.prisma.receita.create({
            data: {
                descricao: data.descricao,
                valor: data.valor,
                datareceb: data.datareceb,
                categoria: {
                    connect: { id: data.categoriaId },
                },
                carteira: {
                    connect: { id: data.carteiraId },
                },
                user: {
                    connect: { id: "357d6fff-f102-4e45-a992-cd665ba0caff" }
                }
            },
        });

        return receita;
    }

    async findAll(filters?: {
        mes?: string;
        ano?: string;
    }) {
        const where: any = {};

        if (filters?.mes && filters?.ano) {
            const { mes, ano } = filters;

            // Cria o primeiro e o último dia do mês
            const primeiroDia = dayjs(`${ano}-${mes}-01`).startOf('month').toDate();
            const ultimoDia = dayjs(`${ano}-${mes}-01`).endOf('month').toDate();

            // Define o filtro BETWEEN
            where.datarecebe = {
                gte: primeiroDia, // Maior ou igual ao primeiro dia do mês
                lte: ultimoDia    // Menor ou igual ao último dia do mês
            };
        }

        console.log(where);

        return this.prisma.receita.findMany({
            where,
            orderBy: {
                datareceb: 'asc'
            }
        });
    }

    async findByGroupCategory(filters?: {
        mes?: string;
        ano?: string;
    }) {
        const where: any = {};

        if (filters?.mes && filters?.ano) {
            const { mes, ano } = filters;

            // Cria o primeiro e o último dia do mês
            const primeiroDia = dayjs(`${ano}-${mes}-01`).startOf('month').toDate();
            const ultimoDia = dayjs(`${ano}-${mes}-01`).endOf('month').toDate();

            // Define o filtro BETWEEN para o campo datareceb
            where.datareceb = {
                gte: primeiroDia, // Maior ou igual ao primeiro dia do mês
                lte: ultimoDia    // Menor ou igual ao último dia do mês
            };
        }

        // Realiza o agrupamento por categoriaId
        const receitasAgrupadas = await this.prisma.receita.findMany({
            where,
            orderBy: {
                datareceb: 'asc',
            },
            include: {
                categoria: true, // Inclui os dados da categoria
            }
        });

        // Agrupa as receitas pelo campo categoriaId e soma os valores
        const receitasPorCategoria = receitasAgrupadas.reduce((acc: any, receita: any) => {
            // Inicializa o total como número
            const valorReceita = parseFloat(receita.valor) || 0;

            // Se a categoria já existir no acumulador, adiciona o valor
            if (acc[receita.categoriaId]) {
                acc[receita.categoriaId].total += valorReceita;
            } else {
                // Caso contrário, cria a categoria com o valor inicial
                acc[receita.categoriaId] = {
                    categoriaDescricao: receita.categoria.descricao,
                    total: valorReceita,
                };
            }
            return acc;
        }, {});

        // Mapeia os resultados para retornar os campos desejados com total formatado
        return Object.values(receitasPorCategoria).map((item: any) => ({
            categoriaDescricao: item.categoriaDescricao,
            total: item.total.toFixed(2), // Converte para string com 2 casas decimais
        }));
    }


    async update(id: string, data: UpdateReceitaDto) {
        const receitaExists = await this.prisma.receita.findUnique({
            where: {
                id,
            },
        });

        if (!receitaExists) {
            throw new Error('Receita does not exists!');
        }

        return await this.prisma.receita.update({
            data,
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<string> {
        // Verificar se o registro existe
        const receitaExists = await this.prisma.receita.findUnique({
            where: {
                id,
            },
        });

        // Caso não exista, lançar um erro
        if (!receitaExists) {
            throw new Error('Receita does not exist!');
        }

        await this.prisma.receita.delete({
            where: { id },
        });

        return `Receita with ID ${id} has been removed.`;
    }
}