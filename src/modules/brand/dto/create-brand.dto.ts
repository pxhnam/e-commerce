import { IsUnique } from '@common/validators';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({ table: 'categories', column: 'name' })
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}

export default CreateBrandDto;
