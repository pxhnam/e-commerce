import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common';
import ProductService from './product.service';
import CreateProductDto from './dto/create-product.dto';

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
  create(@Body() body: CreateProductDto) {
    return this.productService.insert(body);
  }
}

export default ProductController;
