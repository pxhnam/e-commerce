import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import User from './user.entity';
import Product from './product.entity';

@Entity('carts')
class Cart extends BaseEntity {
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}

export default Cart;
