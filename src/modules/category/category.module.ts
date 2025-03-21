import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryController from './category.controller';
import CategoryService from './category.service';
import { Category } from '@modules/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
class CategoryModule {}
export default CategoryModule;
