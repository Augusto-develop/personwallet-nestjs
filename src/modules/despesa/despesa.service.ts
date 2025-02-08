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
import { CreateCreditoDto } from '../credito/dto/create-credito.dto';
import { createDateTime, convertDateForDateTime } from 'src/lib/util';
import { Prisma, TypeCredit } from '@prisma/client';

@Injectable()
export class DespesaService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateDespesaDto) {
        return this.prisma.$transaction(async (prisma) => {
            // Cria a despesa
            const despesa = await prisma.despesa.create({
                
                data: {
                    descricao: data.descricao,
                    categoria: {
                        connect: { id: data.categoriaId },
                    },
                    anofat: data.anofat,
                    mesfat: data.mesfat,
                    numparc: data.numparc,
                    qtdeparc: data.qtdeparc,
                    lancamento: data.lancamento,
                    valor: data.valor,
                    generateparc: data.generateparc,                    
                    credit: data.creditId
                        ? {
                            connect: { id: data.creditId }, // Conecta ao registro existente
                        }
                        : undefined,
                    user: { connect: { id: "55421222" } },
                },
            });

            // Verifica se o creditId pertence a um Credit do tipo 'AVISTA'
            if (data.creditId) {
                const credit = await prisma.credit.findUnique({
                    where: { id: data.creditId },
                    select: { type: true },
                });

                if (credit?.type === TypeCredit.AVISTA) {
                    // Cria um movimento relacionado à despesa
                    await prisma.movimento.create({
                        data: {
                            cartdebito: data.carteiraPg,
                            ocorrencia: despesa.lancamento,
                            valor: despesa.valor,
                            anofat: despesa.anofat,
                            mesfat: despesa.mesfat,
                            creditId: data.creditId,
                            user: { connect: { id: "55421222" } },
                        },
                    });
                }
            }

            return despesa;
        });
    }
    

    async findAll(filters?: {
        creditId?: string;
        mesfat?: string;
        anofat?: string;
        type?: string;
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

        if (filters?.type) {
            where.credit = { type: filters.type };
            where.creditId = { not: null };
        }

        return this.prisma.despesa.findMany({ where, orderBy: { lancamento: 'asc' } });
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
        const dependentRecords = await this.prisma.despesa.findMany({
            where: { parentId: id },
        });

        if (dependentRecords.length > 0) {
            throw new Error(
                'Não é possível excluir. Existem registros dependentes.',
            );
        }

        await this.prisma.despesa.delete({
            where: { id },
        });

        return `Despesa with ID ${id} has been removed.`;
    }

    async removeParcelas(id: string) {
        const result = await this.prisma.despesa.deleteMany({
            where: {
                parentId: id, // Usa deleteMany para apagar múltiplos registros
            },
        });

        if (!result) {
            throw new Error('Erro ao tentar excluir parcelas!');
        }

        const updatedDespesa = await this.prisma.despesa.update({
            where: {
                id: id,
            },
            data: {
                generateparc: false, // Define generateparc como false
            },
        });

        return updatedDespesa;
    }

    async createParcelas(id: string) {
        // Primeiro, buscamos a despesa existente
        const despesa = await this.prisma.despesa.findUnique({
            where: { id },
        });

        if (!despesa) {
            throw new NotFoundException(`Despesa com ID ${id} não encontrada.`);
        }

        // Calculando o valor de cada parcela
        const numeroparc = despesa.numparc;
        const qtdeparc = despesa.qtdeparc;

        let reffatura = new Date(`${despesa.anofat}-${despesa.mesfat}-01`);

        // Criando as parcelas
        const parcelas: CreateDespesaDto[] = [];
        for (let i = numeroparc + 1; i <= qtdeparc; i++) {
            reffatura.setMonth(reffatura.getMonth() + 1);
            const anofat = reffatura.getFullYear().toString();
            const mesfat = (reffatura.getMonth() + 1)
                .toString()
                .padStart(2, '0');

            parcelas.push({
                creditId: despesa.creditId,
                categoriaId: despesa.categoriaId,
                anofat: anofat,
                mesfat: mesfat,
                descricao: despesa.descricao,
                numparc: i,
                qtdeparc: despesa.qtdeparc,
                lancamento: convertDateForDateTime(despesa.lancamento),
                valor: despesa.valor,
                generateparc: false,
                parentId: id,
            });
        }

        // Inserindo as parcelas no banco de dados
        await this.prisma.despesa.createMany({
            data: parcelas, // Inserir todas as parcelas de uma vez
        });

        const updatedDespesa = await this.prisma.despesa.update({
            where: {
                id: id,
            },
            data: {
                generateparc: true, // Define generateparc como false
            },
        });

        return updatedDespesa;
    }

    async createDespesasFixas(mesfat: string, anofat: string) {
        // Buscar os créditos com o tipo informado
        const credits: CreateCreditoDto[] = await this.prisma.credit.findMany({
            where: {
                type: TypeCredit.DESPESAFIXA,
            },
        });

        if (!credits || credits.length === 0) {
            throw new NotFoundException(`Nenhuma despesa fixa encontrada.`);
        }

        const despesasCriadas: CreateDespesaDto[] = []; // Para armazenar as despesas criadas

        // Para cada crédito encontrado
        for (const credit of credits) {
            // Verificar se já existe alguma despesa com esse crédito
            const despesasExistentes = await this.prisma.despesa.findMany({
                where: {
                    creditId: credit.id,
                    anofat: anofat,
                    mesfat: mesfat
                },
            });

            if (despesasExistentes.length > 0) {
                console.log(`Despesas já existem para o crédito ${credit.id}. Pulando criação.`);
                continue; // Pula se já houver despesas
            }

            despesasCriadas.push({
                creditId: credit.id,
                categoriaId: credit.categoriaId,
                anofat: anofat,
                mesfat: mesfat,
                descricao: credit.descricao,
                numparc: 1,
                qtdeparc: 1,
                lancamento: createDateTime(credit.diavenc, mesfat, anofat),
                valor: credit.valorcredito,
                generateparc: false,
                parentId: null,
            });
        }

        const registrosCriados = await Promise.all(
            despesasCriadas.map((despesa: CreateDespesaDto) =>
                this.prisma.despesa.create({ data: despesa })
            )
        );

        return registrosCriados;
    }

    async getExpenseSums(filters?: {
        creditId?: string;
        mesfat?: string;
        anofat?: string;
    }) {
        // Convertendo mesfat e anofat para calcular meses anteriores e posteriores
        const currentDate = new Date(`${filters.anofat}-${filters.mesfat}-01`);
        const previousDate = new Date(currentDate);
        previousDate.setMonth(currentDate.getMonth() - 1);
        const nextDate = new Date(currentDate);
        nextDate.setMonth(currentDate.getMonth() + 1);

        const [previousYear, previousMonth] = [
            previousDate.getFullYear(),
            String(previousDate.getMonth() + 1).padStart(2, '0'),
        ];
        const [nextYear, nextMonth] = [
            nextDate.getFullYear(),
            String(nextDate.getMonth() + 1).padStart(2, '0'),
        ];

        // Consultando as despesas de todos os períodos de interesse (anterior, atual, posterior e futuro)
        const [previous, current, next, future] = await Promise.all([
            this.prisma.despesa.aggregate({
                _sum: { valor: true },
                where: {
                    creditId: filters.creditId,
                    anofat: previousYear.toString(),
                    mesfat: previousMonth,
                },
            }),
            this.prisma.despesa.aggregate({
                _sum: { valor: true },
                where: {
                    creditId: filters.creditId,
                    anofat: filters.anofat,
                    mesfat: filters.mesfat,
                },
            }),
            this.prisma.despesa.aggregate({
                _sum: { valor: true },
                where: {
                    creditId: filters.creditId,
                    anofat: nextYear.toString(),
                    mesfat: nextMonth,
                },
            }),
            this.prisma.despesa.aggregate({
                _sum: { valor: true },
                where: {
                    creditId: filters.creditId,
                    OR: [
                        {
                            anofat: { gt: filters.anofat },
                        },
                        {
                            anofat: filters.anofat,
                            mesfat: { gt: filters.mesfat },
                        },
                    ],
                },
            }),
        ]);

        return {
            current: current._sum.valor || 0,
            previous: previous._sum.valor || 0,
            next: next._sum.valor || 0,
            future: future._sum.valor || 0,
        };
    };

}