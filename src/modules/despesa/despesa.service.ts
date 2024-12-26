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
            where.credits = {type: filters.type };
            where.creditId = {not: null};            
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
                fixa: despesa.fixa,
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
                type: "DESPESAFIXA",
            },
        });
    
        if (!credits || credits.length === 0) {
            throw new NotFoundException(`Nenhuma despesa fixa encontrada.`);
        }
    
        const despesasCriadas: CreateDespesaDto[]  = []; // Para armazenar as despesas criadas
    
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
                categoriaId: '62f40b32-5528-43a3-9d2d-6af7e20bde18',
                anofat: anofat,
                mesfat: mesfat,
                descricao: credit.descricao,
                numparc: 1,
                qtdeparc: 1,
                lancamento: createDateTime(credit.diavenc, mesfat, anofat),
                valor: credit.valorcredito,
                fixa: false,
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
}