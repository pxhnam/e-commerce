import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import InvoiceDetailController from './invoice-detail.controller';
import InvoiceDetailService from './invoice-detail.service';
import { InvoiceDetail } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail])],
  controllers: [InvoiceDetailController],
  providers: [InvoiceDetailService],
  exports: [InvoiceDetailService]
})
class InvoiceDetailModule {}
export default InvoiceDetailModule;
