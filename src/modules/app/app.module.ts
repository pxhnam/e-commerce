import { Module } from '@nestjs/common';
import AppController from '@modules/app/app.controller';
import AppService from '@modules/app/app.service';
import AppConfigModule from '@modules/config/config.module';
import DatabaseModule from '@modules/database/database.module';
import UserModule from '@modules/user/user.module';
import AuthModule from '@modules/auth/auth.module';
import CategoryModule from '@modules/category/category.module';
import BrandModule from '@modules/brand/brand.module';
import InvoiceModule from '@modules/invoice/invoice.module';
import InvoiceDetailModule from '@modules/invoice-detail/invoice-detail.module';
import ProductModule from '@modules/product/product.module';
import UserAddressModule from '@modules/user-address/user-address.module';
import CartModule from '@modules/cart/cart.module';
import TokenModule from '@modules/token/token.module';
import { IsExistsConstraint, IsUniqueConstraint } from '@common/validators';
import CloudinaryModule from '@modules/cloudinary/cloudinary.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    CloudinaryModule,
    UserModule,
    AuthModule,
    TokenModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    CartModule,
    InvoiceModule,
    InvoiceDetailModule,
    UserAddressModule
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint, IsExistsConstraint]
})
export class AppModule {}
