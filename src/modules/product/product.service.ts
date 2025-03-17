import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@modules/database/entities';
import BaseService from '@modules/base/base.service';
import ImageService from '@modules/image/image.service';
import CloudinaryService from '@modules/cloudinary/cloudinary.service';
import { generateSlug } from '@common/utils';
import { ImageOptions } from './dto/create-product.dto';

@Injectable()
class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly imageService: ImageService,
    private readonly cloudinaryService: CloudinaryService
  ) {
    super(productRepository);
  }

  findBySlug(slug: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ slug });
  }

  async create(data: Partial<Product>, files: Express.Multer.File[]) {
    const product = await this.add({
      ...data,
      slug: generateSlug(data['name'] as string),
      category: { id: data['categoryId'] as string },
      brand: { id: data['brandId'] as string }
    });
    const imageOptions = (data['imageOptions'] as ImageOptions[]) || [];
    await Promise.all(
      files.map(async (file, index) => {
        const { public_id } = await this.cloudinaryService.uploadFile(file);

        return await this.imageService.add({
          url: public_id,
          product,
          isDefault: imageOptions[index]?.isDefault
        });
      })
    );
    return this.productRepository.findOne({
      where: { id: product.id },
      relations: ['category', 'brand', 'images']
    });
  }
}

export default ProductService;
