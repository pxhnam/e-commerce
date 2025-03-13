import { Controller, Get } from '@nestjs/common';
import InvoiceService from './invoice.service';

@Controller('invoices')
class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  index() {
    return '';
  }
}

export default InvoiceController;
