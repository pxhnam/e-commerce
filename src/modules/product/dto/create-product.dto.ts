import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { ProductStatus } from '@common/enums';

class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discountPrice: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  sold: number;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  brandId: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;
}

export default CreateProductDto;
