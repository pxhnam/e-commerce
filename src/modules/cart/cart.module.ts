import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CartController from './cart.controller';
import CartService from './cart.service';
import { Cart } from '@modules/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
class CartModule {}
export default CartModule;
