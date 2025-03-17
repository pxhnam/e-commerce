import { IsExists, IsUnique } from '@common/validators';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

class UpdateBrandDto {
  @IsNotEmpty()
  @IsUUID()
  @IsExists({ table: 'brands', column: 'id' })
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUnique({ table: 'brands', column: 'name' })
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}

export default UpdateBrandDto;
