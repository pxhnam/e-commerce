import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/enums';
import JwtAuthGuard from '@modules/auth/guards/jwt-auth.guard';
import RolesGuard from '@modules/auth/guards/roles.guard';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import UserService from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Roles(Role.ADMIN)
  index() {
    return this.userService.findAll();
  }
}

export default UserController;
