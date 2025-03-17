import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import ImageController from './image.controller';
import ImageService from './image.service';
import { Image } from '@modules/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  //   controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService]
})
class ImageModule {}
export default ImageModule;
