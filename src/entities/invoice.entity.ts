import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import User from './user.entity';
import UserAddress from './user-address.entity';
import InvoiceDetail from './invoice-detail.entity';
import { InvoiceStatus } from '@common/enums';

@Entity('invoices')
class Invoice extends BaseEntity {
  @ManyToOne(() => User, (user) => user.invoices, { nullable: true })
  user: User | null;

  @ManyToOne(() => UserAddress)
  userAddress: UserAddress;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  status: InvoiceStatus;

  @OneToMany(() => InvoiceDetail, (detail) => detail.invoice)
  details: InvoiceDetail[];
}

export default Invoice;
