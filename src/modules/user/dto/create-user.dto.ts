import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length
} from 'class-validator';
import { IsUnique } from '@common/validators';

class CreateUserDto {
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @IsString()
  @Length(6, 50, { message: 'Tên người dùng phải từ 6 đến 50 ký tự' })
  @IsUnique({ table: 'users', column: 'username' })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  @Length(6, 50, { message: 'Mật khẩu phải từ 6 đến 50 ký tự' })
  @IsStrongPassword()
  password: string;
}

export default CreateUserDto;
