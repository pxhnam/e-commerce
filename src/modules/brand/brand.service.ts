import { generateSlug } from '@common/utils';
import BaseService from '@modules/base/base.service';
import CloudinaryService from '@modules/cloudinary/cloudinary.service';
import { Brand, Category } from '@modules/database/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
class BrandService extends BaseService<Brand> {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private readonly cloudinaryService: CloudinaryService
  ) {
    super(brandRepository);
  }

  findBySlug(slug: string): Promise<Category | null> {
    return this.brandRepository.findOneBy({ slug });
  }

  async create(
    data: Partial<Category>,
    file?: Express.Multer.File
  ): Promise<Category> {
    if (!file) throw new BadRequestException('No file uploaded');
    data['slug'] = generateSlug(data['name'] as string);
    const { public_id } = await this.cloudinaryService.uploadFile(file);
    data['image'] = public_id;
    return this.create(data);
  }

  async update(
    id: string,
    data: Partial<Category>,
    file?: Express.Multer.File
  ): Promise<Category> {
    if ('name' in data && data['name']) {
      data['slug'] = generateSlug(data['name']);
    }
    if (file) {
      const { public_id } = await this.cloudinaryService.uploadFile(file);
      data['image'] = public_id;
    }
    return await this.update(id, data);
  }
}

export default BrandService;
