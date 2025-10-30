import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { PrismaService } from '../../database/PrismaService';
import { OmitType } from '@nestjs/mapped-types';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class CarteiraService {
    constructor(private prisma: PrismaService) { }

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
            data: {
              descricao: data.descricao,
              ativo: data.ativo,
              emissor: data.emissor,
              ...(data.userId
                ? { user: { connect: { id: data.userId } } }
                : {} // só conecta se vier userId
              )
            },
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

    async calcularSaldoPorCarteira() {
        const hoje = new Date();

        // Lista todas as carteiras
        const carteiras = await this.prisma.carteira.findMany({
            select: { id: true, descricao: true, emissor: true }, where: { ativo: true }
        });

        // Soma de Receitas até a data de hoje
        const receitas = await this.prisma.receita.groupBy({
            by: ["carteiraId"],
            _sum: {
                valor: true,
            },
            where: {
                datareceb: {
                    lte: hoje,
                },
            },
        });

        // Soma de Movimentos para débito e crédito
        const movimentosDebito = await this.prisma.movimento.groupBy({
            by: ["cartdebito"],
            _sum: {
                valor: true,
            },
        });

        const movimentosCredito = await this.prisma.movimento.groupBy({
            by: ["cartcredito"],
            _sum: {
                valor: true,
            },
        });

        // Combina resultados para cada carteira
        const resultado = carteiras.map((carteira) => {
            const carteiraId = carteira.id;

            // Obtem valores das receitas e movimentos relacionados à carteira
            const totalReceita = new Decimal(
                receitas.find((r) => r.carteiraId === carteiraId)?._sum.valor || 0
            );

            const totalDebito = new Decimal(
                movimentosDebito.find((m) => m.cartdebito === carteiraId)?._sum.valor || 0
            );

            const totalCredito = new Decimal(
                movimentosCredito.find((m) => m.cartcredito === carteiraId)?._sum.valor || 0
            );

            // Calcula o saldo final
            const saldoFinal = totalReceita.minus(totalDebito).plus(totalCredito);

            return {
                carteiraId,
                descricao: carteira.descricao,
                emissor: carteira.emissor,
                saldo: saldoFinal.toNumber(), // Converte para número
            };
        });

        return resultado;
    }
}
