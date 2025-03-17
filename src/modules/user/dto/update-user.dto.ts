import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username: string;
}

export default UpdateUserDto;
