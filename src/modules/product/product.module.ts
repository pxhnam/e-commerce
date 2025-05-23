import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductController from './product.controller';
import ProductService from './product.service';
import { Image, Product } from '@modules/database/entities';
import ImageModule from '@modules/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Image]), ImageModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
class ProductModule {}
export default ProductModule;
