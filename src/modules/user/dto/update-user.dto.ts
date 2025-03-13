import { IsNotEmpty, IsString } from 'class-validator';

class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export default UpdateUserDto;
