import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import serverless from 'serverless-http'
import { SecretsService } from './database/SecretService';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: '*', // Permite todas as origens (para desenvolvimento)
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    });

    // const secretsService = app.get(SecretsService);
    // const dbUrl = await secretsService.getDatabaseUrl(); // Recupera a URL do banco de dados

    // if (!dbUrl || dbUrl.trim() === '') {
    //     throw new Error('A URL do banco de dados não é válida ou não foi obtida.');
    // }

    // // Define a variável de ambiente DATABASE_URL antes de inicializar o Prisma
    // process.env.DATABASE_URL_DEV = dbUrl;


    const config = new DocumentBuilder()
        .setTitle('API PersonWallet')
        .setDescription('Documentação da API Exemplo')
        .setVersion('1.0')        
        .addBearerAuth() // Adiciona suporte a autenticação (se necessário)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);


    await app.listen(3000);

    await app.init();
    
    return app.getHttpAdapter().getInstance();
}
// bootstrap();

// export const handler = serverless(await bootstrap());


// Inicializar a aplicação antes da exportação do handler
const appInstance = bootstrap();

// Exportar o handler como função assíncrona que será resolvida ao inicializar o app
export const handler = async (event: any, context: any) => {
    const app = await appInstance; // Espera o bootstrap ser concluído
    return serverless(app)(event, context); // Passa a instância do app para o serverless
};

