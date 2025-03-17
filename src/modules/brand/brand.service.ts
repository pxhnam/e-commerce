import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand, Category } from '@modules/database/entities';
import BaseService from '@modules/base/base.service';
import CloudinaryService from '@modules/cloudinary/cloudinary.service';
import { generateSlug } from '@common/utils';

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
    file: Express.Multer.File
  ): Promise<Category | null> {
    data['slug'] = generateSlug(data['name'] as string);
    const { public_id } = await this.cloudinaryService.uploadFile(file);
    data['image'] = public_id;
    return this.add(data);
  }

  async update(
    id: string,
    data: Partial<Category>,
    file?: Express.Multer.File
  ): Promise<Category | null> {
    if ('name' in data && data['name']) {
      data['slug'] = generateSlug(data['name']);
    }
    if (file) {
      const { public_id } = await this.cloudinaryService.uploadFile(file);
      data['image'] = public_id;
    }
    return await this.edit(id, data);
  }
}

export default BrandService;
