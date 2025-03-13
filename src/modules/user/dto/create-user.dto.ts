import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length
} from 'class-validator';
import { IsUsernameUnique, IsUsernameValid } from '@validators';

class CreateUserDto {
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @IsString()
  @Length(6, 50, { message: 'Tên người dùng phải từ 6 đến 50 ký tự' })
  @IsUsernameValid()
  @IsUsernameUnique()
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  @Length(6, 50, { message: 'Mật khẩu phải từ 6 đến 50 ký tự' })
  @IsStrongPassword()
  password: string;
}

export default CreateUserDto;
