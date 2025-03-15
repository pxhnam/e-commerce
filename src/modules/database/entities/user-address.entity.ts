import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import User from './user.entity';

@Entity('user_addresses')
class UserAddress extends BaseEntity {
  @ManyToOne(() => User, (user) => user.addresses, { nullable: true })
  user: User | null;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'boolean', default: false })
  isDefault: boolean;
}

export default UserAddress;
