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
import BrandService from './brand.service';
import UploadFile from '@common/decorators/upload-file.decorator';
import CreateBrandDto from './dto/create-brand.dto';
import UpdateBrandDto from './dto/update-brand.dto';

@Controller('brands')
class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  index() {
    return this.brandService.find();
  }

  @Get(':slug')
  async get(@Param('slug') slug: string) {
    const brand = await this.brandService.findBySlug(slug);
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  @Post()
  @UploadFile()
  create(
    @Body() data: CreateBrandDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.brandService.create(data, file);
  }

  @Put(':id')
  @UploadFile()
  async update(
    @Param('id') id: string,
    @Body() data: UpdateBrandDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const brand = await this.brandService.findById(id);
    if (!brand) throw new NotFoundException('Category not found');
    if (data.id !== brand.id) throw new BadRequestException('Invalid ID');
    return this.brandService.update(brand.id, data, file);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const brand = await this.brandService.findById(id);
    if (!brand) throw new NotFoundException('Category not found');
    return this.brandService.softDelete(id);
  }
}

export default BrandController;
