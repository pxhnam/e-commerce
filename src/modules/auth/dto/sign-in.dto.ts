import { IsUsernameValid } from '@validators';
import { IsNotEmpty, IsString } from 'class-validator';

class SignInDto {
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @IsString()
  @IsUsernameValid()
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  password: string;
}

export default SignInDto;
