import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Image } from '@modules/database/entities';

@Injectable()
class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  findById(id: string): Promise<Image | null> {
    return this.imageRepository.findOneBy({ id });
  }

  create(data: DeepPartial<Image>): Promise<Image> {
    const image = this.imageRepository.create(data);
    return this.imageRepository.save(image);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.imageRepository.delete(id);
    return !!(result?.affected && result.affected > 0);
  }
}

export default ImageService;
