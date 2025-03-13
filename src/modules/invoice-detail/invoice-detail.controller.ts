import { Controller, Get } from '@nestjs/common';
import InvoiceDetailService from './invoice-detail.service';

@Controller('invoice-details')
class invoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  @Get()
  index() {
    return '';
  }
}

export default invoiceDetailController;
