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

@Controller('products')
class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  index() {
    return this.productService.find();
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
  update(@Param('id') id: string, @Body() body: CreateProductDto) {
    return this.productService.add(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) throw new NotFoundException('Category not found');
    return this.productService.softDelete(id);
  }
}

export default ProductController;
