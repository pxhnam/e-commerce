import { generateSlug } from '@common/utils';
import BaseService from '@modules/base/base.service';
import CloudinaryService from '@modules/cloudinary/cloudinary.service';
import { Category } from '@modules/database/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService
  ) {
    super(categoryRepository);
  }

  findBySlug(slug: string): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ slug });
  }

  async create(
    data: DeepPartial<Category>,
    file?: Express.Multer.File
  ): Promise<Category> {
    if (!file) throw new BadRequestException('No file uploaded');
    data['slug'] = generateSlug(data['name'] as string);
    const { public_id } = await this.cloudinaryService.uploadFile(file);
    data['image'] = public_id;
    return super.create(data);
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
    return super.update(id, data);
  }
}

export default CategoryService;
