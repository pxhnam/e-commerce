import { Controller, Get } from '@nestjs/common';
import UserAddressService from './user-address.service';

@Controller('user-addresses')
class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Get()
  index() {
    return '';
  }
}

export default UserAddressController;
