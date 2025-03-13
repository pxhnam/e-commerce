import { Controller, Get } from '@nestjs/common';
import BrandService from './brand.service';

@Controller('brands')
class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  index() {
    return '';
  }
}

export default BrandController;
