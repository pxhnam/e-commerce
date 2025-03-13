import { Controller, Get } from '@nestjs/common';
import CategoryService from './category.service';

@Controller('categories')
class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  index() {
    return '';
  }
}

export default CategoryController;
