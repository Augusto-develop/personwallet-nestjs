import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { PrismaService } from '../../database/PrismaService';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class CreditoService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateCreditoDto) {
        // const creditoExists = await this.prisma.credit.findFirst({
        //     where: {
        //         descricao: data.descricao,
        //     },
        // });

        // if (creditoExists) {
        //     throw new Error('Credito already exists');
        // }

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

    // async getCreditWithInvoices(filters: {mesfat: string, anofat: string}): Promise<any> {
    //     const credits = await this.prisma.credit.findMany({
    //       include: {
    //         // Incluir as despesas associadas a cada crédito
    //         despesas: {
    //           where: {
    //             anofat: filters.anofat,
    //             mesfat: filters.mesfat,
    //           },
    //           _sum: {
    //             valor: true,  // Somar o valor das despesas
    //           },
    //         },
    //       },
    //     });
    
    //     // Mapeia os resultados para combinar os valores das despesas com os créditos
    //     return credits.map(credit => ({
    //       ...credit,
    //       totalDespesas: credit.despesas.reduce((acc, despesa) => acc + (despesa._sum.valor || 0), 0), // Soma os valores das despesas
    //     }));
    //   }

      async getCreditWithInvoices(filters: {mesfat: string, anofat: string}): Promise<any> {
        const credits = await this.prisma.credit.findMany({
            where: {
                type: {
                    not: 'AVISTA'
                },
            },
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
          },
        });
    
        // Mapeia os resultados para somar os valores das despesas por credit
        return credits.map(credit => {
            const totalFatura = credit.despesas.reduce((acc, despesa) => acc + despesa.valor.toNumber(), 0);
            return {
                ...credit,
                totalFatura,
            };
        });
      }

    // async getCreditWithInvoices(filters: {mesfat: string, anofat: string}) {
    //     return await this.prisma.credit.findMany({
    //       include: {
    //         despesas: {
    //           where: {
    //             anofat: filters.anofat,
    //             mesfat: filters.mesfat,
    //           },
    //           select: {
    //             valor: true,
    //           },
    //         },
    //       },
    //     }).then((credits) =>
    //       credits.map((credit) => {
    //         const totalDespesas = credit.despesas.reduce((sum, despesa) => sum + Number(despesa.valor), 0);
    //         return {
    //           ...credit,
    //           totalDespesas,
    //         };
    //       }),
    //     );
    // }
    

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
