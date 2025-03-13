import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import Image from './image.entity';
import Category from './category.entity';
import Brand from './brand.entity';
import { ProductStatus } from '@common/enums';

@Entity('products')
class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column()
  shortDescription: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountPrice: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'int', default: 0 })
  sold: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  images: Image[];

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.HIDDEN
  })
  status: ProductStatus;
}

export default Product;
