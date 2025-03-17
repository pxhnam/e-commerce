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
import { IsExists, IsUnique } from '@common/validators';

class UpdateProductDto {
  @IsNotEmpty()
  @IsUUID()
  @IsExists({ table: 'products', column: 'id' })
  id: string;

  @IsOptional()
  @IsString()
  @IsUnique({ table: 'products', column: 'name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discountPrice: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  sold: number;

  @IsOptional()
  @IsUUID()
  @IsExists({ table: 'categories' })
  categoryId: string;

  @IsOptional()
  @IsUUID()
  @IsExists({ table: 'brands' })
  brandId: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}

export default UpdateProductDto;
