import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import dayjs from 'dayjs';

@Injectable()
export class ReceitaService {
    constructor(private prisma: PrismaService) {}
    
    async create(data: CreateReceitaDto) {
        const receita = await this.prisma.receita.create({
            data,
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
    
        return this.prisma.receita.findMany({
            where, 
            orderBy: { 
                datareceb: 'asc' 
            }
        });
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