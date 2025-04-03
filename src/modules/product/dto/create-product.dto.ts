import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { ProductStatus } from '@common/enums';
import { Transform, Type } from 'class-transformer';
import { IsExists } from '@common/validators';
import { Logger } from '@nestjs/common';
import ImageOptions from './image-options.dto';

class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discountPrice: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sold: number;

  @IsUUID()
  @IsExists({ table: 'categories' })
  categoryId: string;

  @IsUUID()
  @IsExists({ table: 'brands' })
  brandId: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsOptional()
  @IsArray()
  @Transform(({ value }): ImageOptions[] => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch (e) {
      Logger.error(e);
      return [];
    }
  })
  imageOptions: ImageOptions[];
}

export default CreateProductDto;
