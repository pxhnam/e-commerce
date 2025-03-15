import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@modules/database/entities';
import BaseService from '@modules/base/base.service';

@Injectable()
class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {
    super(productRepository);
  }

  findBySlug(slug: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ slug });
  }
}

export default ProductService;
