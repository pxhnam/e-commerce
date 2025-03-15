import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile
} from '@nestjs/common';
import CategoryService from './category.service';
import CreateCategoryDto from './dto/create-category.dto';
import UploadFile from '@common/decorators/upload-file.decorator';
import UpdateCategoryDto from './dto/update-category.dto';

@Controller('categories')
class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  index() {
    return this.categoryService.find();
  }

  @Get(':slug')
  async get(@Param('slug') slug: string) {
    const category = await this.categoryService.findBySlug(slug);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  @Post()
  @UploadFile()
  create(
    @Body() data: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.categoryService.create(data, file);
  }

  @Put(':id')
  @UploadFile()
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const category = await this.categoryService.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    if (data.id !== category.id) throw new BadRequestException('Invalid ID');
    return this.categoryService.update(category.id, data, file);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const category = await this.categoryService.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return this.categoryService.softDelete(id);
  }
}

export default CategoryController;
