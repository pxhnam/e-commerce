import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '@modules/database/entities';
import BaseService from '@modules/base/base.service';

@Injectable()
class ImageService extends BaseService<Image> {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {
    super(imageRepository);
  }
}

export default ImageService;
