import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import InvoiceController from './invoice.controller';
import InvoiceService from './invoice.service';
import { Invoice } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService]
})
class InvoiceModule {}
export default InvoiceModule;
