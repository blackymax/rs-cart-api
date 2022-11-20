import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from './services';

import { UserController } from './user.controller';

import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [forwardRef(() => CartModule)],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
