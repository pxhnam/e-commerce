import { Controller, Get } from '@nestjs/common';
import CartService from './cart.service';

@Controller('carts')
class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  index() {
    return '';
  }
}

export default CartController;
