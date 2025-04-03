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
  UploadedFiles
} from '@nestjs/common';
import ProductService from './product.service';
import CreateProductDto from './dto/create-product.dto';
import UploadFiles from '@common/decorators/upload-files.decorator';
import UpdateProductDto from './dto/update-product.dto';

@Controller('products')
class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  index() {
    return this.productService.findAll();
  }

  @Get(':slug')
  async get(@Param('slug') slug: string) {
    const product = await this.productService.findBySlug(slug);
    if (!product) throw new NotFoundException();
    return product;
  }

  @Post()
  @UploadFiles()
  create(
    @Body() data: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    if (!files || files.length < 1)
      throw new BadRequestException('No files uploaded');
    return this.productService.create(data, files);
  }

  @Put(':id')
  @UploadFiles()
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    const product = await this.productService.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    if (data.id !== product.id) throw new BadRequestException('Invalid ID');
    return this.productService.update(product.id, data, files);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) throw new NotFoundException('Category not found');
    return this.productService.delete(id);
  }
}

export default ProductController;
