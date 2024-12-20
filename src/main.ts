import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: '*', // Permite todas as origens (para desenvolvimento)
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    });
    await app.listen(3000);
}
bootstrap();
