import { forwardRef, Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { UsersModule } from 'src/users/users.module';
import { CartItemModule } from 'src/cart-item/cart-item.module';

@Module({
  imports: [
    OrderModule,
    forwardRef(() => UsersModule),
    CartItemModule,
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
