import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import Invoice from './invoice.entity';
import Product from './product.entity';

@Entity('invoice_details')
class InvoiceDetail extends BaseEntity {
  @ManyToOne(() => Invoice, (invoice) => invoice.details)
  invoice: Invoice;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product)
  product: Product;
}

export default InvoiceDetail;
