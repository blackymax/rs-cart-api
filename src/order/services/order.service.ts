import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';

@Injectable()
export class OrderService {
  constructor(@InjectClient() private readonly pg: Client) {}

  async findById(orderId: string): Promise<any> {
    const orders = await this.pg.query(
      `SELECT * FROM orders WHERE id=$1 LIMIT 1`,
      [orderId],
    );
    return orders.rows[0];
  }

  async getOrders(): Promise<any> {
    const orders = await this.pg.query(`SELECT * FROM orders`);
    return orders.rows;
  }

  async create(data: any) {
    const { user_id, cart_id, payment, delievery, comments, total } = data;

    const orders = await this.pg.query(
      `INSERT INTO orders (user_id, cart_id, payment, delievery, comments, total, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_id, cart_id, payment, delievery, comments, total, 'inProgress'],
    );

    console.log('ORDERS', orders);

    return orders.rows[0];
  }

  async updateById(orderId, data): Promise<any> {
    const {
      user_id,
      cart_id,
      payment,
      delievery,
      comments,
      total,
      status,
    } = data;
    const orders = await this.pg.query(
      `UPDATE orders SET (user_id = $1, cart_id = $2, payment = $3, delivery = $4, comments = $5, total = $6, status = $7) WHERE id=$8 LIMIT 1`,
      [user_id, cart_id, payment, delievery, comments, total, status, orderId],
    );
    return orders.rows[0];
  }

  async updateStatusAndCommentById(orderId, data): Promise<any> {
    const { comments, status } = data;
    const orders = await this.pg.query(
      `UPDATE orders SET ( comments = $1, status = $2) WHERE id=$3 LIMIT 1`,
      [comments, status, orderId],
    );
    return orders.rows[0];
  }

  async deleteOrder(orderId): Promise<any> {
    await this.pg.query(`DELETE FROM orders WHERE id=$1`, [
      orderId,
    ]);
  }
}
