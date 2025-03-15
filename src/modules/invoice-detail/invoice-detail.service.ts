import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceDetail } from '@modules/database/entities';

@Injectable()
class InvoiceDetailService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private readonly invoiceDetailRepository: Repository<InvoiceDetail>
  ) {}
}

export default InvoiceDetailService;
