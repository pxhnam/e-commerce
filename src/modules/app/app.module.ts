import { IsExistsConstraint, IsUniqueConstraint } from '@common/validators';
import { LoggerMiddleware } from '@middleware';
import AppController from '@modules/app/app.controller';
import AppService from '@modules/app/app.service';
import AuthModule from '@modules/auth/auth.module';
import BrandModule from '@modules/brand/brand.module';
import CartModule from '@modules/cart/cart.module';
import CategoryModule from '@modules/category/category.module';
import CloudinaryModule from '@modules/cloudinary/cloudinary.module';
import AppConfigModule from '@modules/config/config.module';
import DatabaseModule from '@modules/database/database.module';
import InvoiceDetailModule from '@modules/invoice-detail/invoice-detail.module';
import InvoiceModule from '@modules/invoice/invoice.module';
import ProductModule from '@modules/product/product.module';
import UserAddressModule from '@modules/user-address/user-address.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    CloudinaryModule,
    AuthModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
