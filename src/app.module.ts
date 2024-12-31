import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DespesaModule } from './modules/despesa/despesa.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CarteiraModule } from './modules/carteira/carteira.module';
import { RetornoModule } from './modules/retorno/retorno.module';
import { CreditoModule } from './modules/credito/credito.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ReceitaModule } from './modules/receita/receita.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DespesaModule,
    UsuarioModule,
    AuthModule,    
    CarteiraModule, 
    RetornoModule, 
    CreditoModule, 
    CategoriaModule, 
    ReceitaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
