import { IsUsername } from '@common/validators';
import { IsNotEmpty, IsString } from 'class-validator';

class SignInDto {
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @IsString()
  @IsUsername()
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  password: string;
}

export default SignInDto;
