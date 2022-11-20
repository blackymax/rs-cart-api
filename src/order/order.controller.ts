import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { headers } from '../constants';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { AppRequest } from '../shared';

import { OrderService } from './services';

const userId = '9c074dae-3595-4b59-b40f-c5f8196d4abc';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async getOrders(@Req() req: AppRequest) {
    const orders = await this.orderService.getOrders();

    return {
      statusCode: HttpStatus.OK,
      headers,
      message: 'OK',
      data: { items: orders },
    };
  }

  @Get(':id')
  async getOrderById(@Req() req: AppRequest) {
    const orders = await this.orderService.findById(req.params.id);

    return {
      statusCode: HttpStatus.OK,
      headers,
      message: 'OK',
      data: { items: orders },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async submitOrder(@Req() req: AppRequest, @Body() body) {
    console.log('submitOrder', body);
    const order = {
      user_id: userId,
      cart_id: body.cartId,
      payment: { pay: '0' },
      delievery: { ...body.address },
      comments: body.address.comment,
      total: 0,
    };

    const createdOrder = await this.orderService.create(order);

    return {
      statusCode: HttpStatus.OK,
      headers,
      message: 'OK',
      data: {
        order: createdOrder,
      },
    };
  }

  @Put(':id/status')
  async updateOrderStatus(@Req() req: AppRequest, @Body() body) {
    // TODO: validate body payload...
    console.log('updateOrderStatus', body);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async deleteOrder(@Req() req: AppRequest) {
    await this.orderService.deleteOrder(req.params.id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }
}
