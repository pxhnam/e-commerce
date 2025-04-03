import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TokenService from './token.service';
import { Token } from '@modules/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService]
})
class TokenModule {}
export default TokenModule;
