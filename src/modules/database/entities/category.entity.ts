import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import Product from './product.entity';

@Entity('categories')
class Category extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  image: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

export default Category;
