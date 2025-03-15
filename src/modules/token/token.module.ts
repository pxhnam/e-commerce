import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TokenController from './token.controller';
import TokenService from './token.service';
import { Token } from '@modules/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
class TokenModule {}
export default TokenModule;
