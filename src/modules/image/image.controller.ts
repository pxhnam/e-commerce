import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param
} from '@nestjs/common';
import ImageService from './image.service';

@Controller('images')
class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  index() {
    return this.imageService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const image = await this.imageService.findById(id);
    if (!image) throw new NotFoundException('Image not found');
    return this.imageService.delete(id);
  }
}

export default ImageController;
