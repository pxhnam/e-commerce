import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import Product from './product.entity';

@Entity('brands')
class Brand extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}

export default Brand;
