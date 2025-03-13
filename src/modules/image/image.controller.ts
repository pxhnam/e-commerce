import { Controller, Get } from '@nestjs/common';
import ImageService from './image.service';

@Controller('images')
class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  index() {
    return '';
  }
}

export default ImageController;
