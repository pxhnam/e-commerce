import { IsExists, IsUnique } from '@common/validators';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

class UpdateCategoryDto {
  @IsNotEmpty()
  @IsUUID()
  @IsExists({ table: 'categories', column: 'id' })
  id: string;

  @IsOptional()
  @IsString()
  @IsUnique({ table: 'categories', column: 'name' })
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}

export default UpdateCategoryDto;
