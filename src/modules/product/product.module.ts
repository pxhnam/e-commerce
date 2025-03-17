import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductController from './product.controller';
import ProductService from './product.service';
import { Product } from '@modules/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Image])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
class ProductModule {}
export default ProductModule;
