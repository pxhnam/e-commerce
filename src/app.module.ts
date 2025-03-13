import { Module } from '@nestjs/common';
import AppController from '@app.controller';
import AppService from '@app.service';
import AppConfigModule from '@config/config.module';
import DatabaseModule from '@database/database.module';
import UserModule from '@modules/user/user.module';
import AuthModule from '@modules/auth/auth.module';
import CategoryModule from '@modules/category/category.module';
import BrandModule from '@modules/brand/brand.module';
import ImageModule from '@modules/image/image.module';
import InvoiceModule from '@modules/invoice/invoice.module';
import InvoiceDetailModule from '@modules/invoice-detail/invoice-detail.module';
import ProductModule from '@modules/product/product.module';
import UserAddressModule from '@modules/user-address/user-address.module';
import CartModule from '@modules/cart/cart.module';
import TokenModule from '@modules/token/token.module';
import { IsExistsConstraint, IsUniqueConstraint } from '@common/validators';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    TokenModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    ImageModule,
    CartModule,
    InvoiceModule,
    InvoiceDetailModule,
    UserAddressModule
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint, IsExistsConstraint]
})
export class AppModule {}
