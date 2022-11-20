import { forwardRef, Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartItemService } from './services';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    OrderModule,
    forwardRef(() => UsersModule),
  ],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
