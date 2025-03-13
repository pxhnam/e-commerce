import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException
} from '@nestjs/common';
import UserService from './user.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index() {
    return this.userService.find();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

export default UserController;
