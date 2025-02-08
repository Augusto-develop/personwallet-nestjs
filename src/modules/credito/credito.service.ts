import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { PrismaService } from '../../database/PrismaService';
import { OmitType } from '@nestjs/mapped-types';
import { TypeCredit } from '@prisma/client';

@Injectable()
export class CreditoService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateCreditoDto) {

        const credito = await this.prisma.credit.create({
            data: {
                descricao: data.descricao,
                type: data.type || 'CARTAO',
                categoria: data.categoriaId ? { connect: { id: data.categoriaId } } : null,
                valorcredito: data.valorcredito || null,
                diavenc: data.diavenc,
                diafech: data.diafech,
                bandeira: data.bandeira,
                // userId: "55421222"
                user: { connect: { id: "55421222" } },
            }
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

    async getCreditCardLimits() {
        const credits = await this.prisma.credit.findMany({
            where: {
                type: TypeCredit.CARTAO,
            },
            orderBy: { diavenc: 'asc' }
        });

        const creditLimits = await Promise.all(
            credits.map(async (credit) => {
                // Converte valorcredito para número, trata null como 0
                const valorCredito = credit.valorcredito ? credit.valorcredito.toNumber() : 0;

                // Soma das despesas para este crédito
                const totalDespesas = await this.prisma.despesa.aggregate({
                    where: {
                        creditId: credit.id,
                    },
                    _sum: {
                        valor: true,
                    },
                });

                // Soma dos movimentos para este crédito
                const totalMovimentos = await this.prisma.movimento.aggregate({
                    where: {
                        creditId: credit.id,
                    },
                    _sum: {
                        valor: true,
                    },
                });

                // Trata undefined ou null como 0
                const despesasSum = totalDespesas._sum.valor ? totalDespesas._sum.valor.toNumber() : 0;
                const movimentosSum = totalMovimentos._sum.valor ? totalMovimentos._sum.valor.toNumber() : 0;

                // Calcula o limite do cartão
                const limite = (valorCredito + movimentosSum - despesasSum).toFixed(2);

                return {
                    ...credit,
                    limite,
                };
            }),
        );

        return creditLimits;
    }


    async getCreditWithInvoices(filters: { mesfat: string, anofat: string }): Promise<any> {
        const credits = await this.prisma.credit.findMany({
            // where: {
            //     type: {
            //         not: 'AVISTA'
            //     },
            // },
            orderBy: { diavenc: 'asc' },
            select: {
                id: true,
                descricao: true,
                type: true,
                emissor: true,
                diavenc: true,
                valorcredito: true,
                diafech: true,
                bandeira: true,
                categoriaId: true,
                createdAt: true,
                updatedAt: true,
                // Inclui as despesas com o filtro
                despesas: {
                    where: {
                        anofat: filters.anofat,
                        mesfat: filters.mesfat,
                    },
                    select: {
                        valor: true, // Seleciona apenas o valor da despesa
                    },
                },
                movimentos: {
                    where: {
                        anofat: filters.anofat,
                        mesfat: filters.mesfat,
                    },
                    select: {
                        id: true,
                        valor: true,
                        ocorrencia: true,
                        cartdebito: true,
                    },
                },
            },
        });

        // Mapeia os resultados para somar os valores das despesas por credit
        return credits.map(credit => {
            const totalFatura = credit.despesas.reduce((acc, despesa) => acc + despesa.valor.toNumber(), 0);
            // Remove o campo despesas do retorno
            const { despesas, ...creditWithoutDespesas } = credit;
            return {
                ...creditWithoutDespesas,
                totalFatura,
            };
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
