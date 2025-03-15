import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import User from './user.entity';

@Entity('tokens')
class Token extends BaseEntity {
  @ManyToOne(() => User, (user) => user.tokens)
  user: User;

  @Column({ type: 'varchar' })
  token: string;
}

export default Token;
