import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { ProductStatus } from '@common/enums';
import { Type } from 'class-transformer';
import { IsExists } from '@common/validators';

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
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discountPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  sold: number;

  @IsUUID()
  @IsExists({ table: 'categories' })
  categoryId: string;

  @IsUUID()
  @IsExists({ table: 'brands' })
  brandId: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;
}

export default CreateProductDto;
