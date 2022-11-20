import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { PostgresModule } from 'nest-postgres';

const PG_CONNECTION =
  'postgres://postgres:0dwrJFVYpcjXCKBMpccN@awsdb.c2cf02vn1xvw.eu-west-1.rds.amazonaws.com:5432/awsdb';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule.forRoot({
      connectionString: PG_CONNECTION,
    }),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
