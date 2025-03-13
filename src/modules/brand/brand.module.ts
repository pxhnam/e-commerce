import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BrandController from './brand.controller';
import BrandService from './brand.service';
import { Brand } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService]
})
class BrandModule {}
export default BrandModule;
