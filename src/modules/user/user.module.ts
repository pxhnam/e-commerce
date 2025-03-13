import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from './user.controller';
import UserService from './user.service';
import { User } from '@entities';
import { IsUsernameUniqueConstraint } from '@validators';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, IsUsernameUniqueConstraint],
  exports: [UserService]
})
class UserModule {}
export default UserModule;
