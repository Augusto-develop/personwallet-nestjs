import { Module } from '@nestjs/common';
import { RetornoController } from './retorno.controller';
import { RetornoService } from './retorno.service';

@Module({
  controllers: [RetornoController],
  providers: [RetornoService]
})
export class RetornoModule {}
