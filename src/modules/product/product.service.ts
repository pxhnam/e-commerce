import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from '@modules/database/entities';
import CloudinaryService from '@modules/cloudinary/cloudinary.service';
import { generateSlug } from '@common/utils';
import ImageOptions from './dto/image-options.dto';
import ImageService from '@modules/image/image.service';

@Injectable()
class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly imageService: ImageService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findById(id: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  findBySlug(slug: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ slug });
  }

  async create(
    data: DeepPartial<Product>,
    files: Express.Multer.File[]
  ): Promise<Product | null> {
    const product = this.productRepository.create({
      ...data,
      slug: generateSlug(data['name'] as string),
      category: { id: data['categoryId'] as string },
      brand: { id: data['brandId'] as string }
    });
    await this.productRepository.save(product);
    const imageOptions = Array.isArray(data['imageOptions'])
      ? (data['imageOptions'] as ImageOptions[])
      : [];
    await Promise.all(
      files.map(async (file, index) => {
        const { public_id } = await this.cloudinaryService.uploadFile(file);
        await this.imageService.create({
          url: public_id,
          product,
          isDefault: imageOptions[index]?.isDefault || false
        });
      })
    );
    return this.productRepository.findOne({
      where: { id: product.id },
      relations: ['category', 'brand', 'images']
    });
  }

  async update(
    id: string,
    data: Partial<Product>,
    files?: Express.Multer.File[]
  ): Promise<Product | null> {
    const product = this.productRepository.create({
      ...data,
      slug: generateSlug(data['name'] as string),
      category: { id: data['categoryId'] as string },
      brand: { id: data['brandId'] as string }
    });
    await this.productRepository.save(product);
    const imageOptions = Array.isArray(data['imageOptions'])
      ? (data['imageOptions'] as ImageOptions[])
      : [];
    if (files) {
      await Promise.all(
        files.map(async (file, index) => {
          const { public_id } = await this.cloudinaryService.uploadFile(file);
          await this.imageService.create({
            url: public_id,
            product,
            isDefault: imageOptions[index]?.isDefault || false
          });
        })
      );
    }
    return this.productRepository.findOne({
      where: { id: product.id },
      relations: ['category', 'brand', 'images']
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return !!(result?.affected && result.affected > 0);
  }
}

export default ProductService;
