import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserAddressController from './user-address.controller';
import UserAddressService from './user-address.service';
import { UserAddress } from '@modules/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  controllers: [UserAddressController],
  providers: [UserAddressService],
  exports: [UserAddressService]
})
class UserAddressModule {}
export default UserAddressModule;
