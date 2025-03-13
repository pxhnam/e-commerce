import { Controller, Get } from '@nestjs/common';
import TokenService from './token.service';

@Controller('tokens')
class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  index() {
    return this.tokenService.find();
  }
}

export default TokenController;
