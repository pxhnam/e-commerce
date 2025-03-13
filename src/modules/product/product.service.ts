import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@entities';

@Injectable()
class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  find(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findById(id: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  findBySlug(slug: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ slug });
  }

  create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async update(
    id: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productRepository.softDelete({ id });
    return result.affected !== undefined && result.affected > 0;
  }
}

export default ProductService;
