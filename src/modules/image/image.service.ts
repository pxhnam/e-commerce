import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '@entities';

@Injectable()
class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}
}

export default ImageService;
