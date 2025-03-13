import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import Product from './product.entity';

@Entity('images')
class Image extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @Column()
  url: string;

  @Column({ type: 'boolean', default: false })
  isDefault: boolean;
}

export default Image;
