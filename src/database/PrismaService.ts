import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    //   async enableShutdownHooks(app: INestApplication) {
    //     this.$on('beforeExit', async () => {
    //       await app.close();
    //     });
    //   }
}

// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { SecretsService } from './SecretService'; // Importe o SecretsService que você já criou

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
//     constructor(private readonly secretsService: SecretsService) {
//         super();
//     }

//     // Conectar ao Prisma quando o módulo for inicializado
//     async onModuleInit() {
//         const dbUrl = await this.secretsService.getDatabaseUrl(); // Obtém a URL de conexão do banco de dados do Secrets Manager

//         // Define a variável de ambiente DATABASE_URL dinamicamente
//         console.log(dbUrl);
//         if (dbUrl && dbUrl.trim() !== '') {
//             process.env.DATABASE_URL = dbUrl;
//         }

//         // Conecta ao Prisma
//         await this.$connect();
//     }

//     // Desconectar o Prisma quando o módulo for destruído (ao fechar a aplicação)
//     async onModuleDestroy() {
//         await this.$disconnect();
//     }

//     // Exemplo de método para gerenciar o shutdown da aplicação e a conexão com o Prisma
//     //   async enableShutdownHooks(app) {
//     //     this.$on('beforeExit', async () => {
//     //       await app.close(); // Fechar a aplicação corretamente quando o Prisma estiver saindo
//     //     });
//     //   }
// }
