import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';

@Injectable()
export class CartItemService {
  constructor(
    @InjectClient()
    private readonly pg: Client,
  ) {}

  async findById(cartItemId: string) {
    const cartItems = await this.pg.query(
      `SELECT * FROM cart_items WHERE id=$1 LIMIT 1`,
      [cartItemId],
    );

    return cartItems.rows;
  }

  async findByCartId(cartId: string) {
    const cartItems = await this.pg.query(
      `SELECT * FROM cart_items WHERE cart_id=$1 LIMIT 1`,
      [cartId],
    );

    return cartItems.rows[0];
  }

  async getAllCartItems() {
    const cartItems = await this.pg.query(`SELECT * FROM cart_items`);

    return cartItems.rows;
  }

  async create(cart: any) {
    const cartItems = await this.pg.query(
      `INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3) RETURNING *`,
      [cart.cart_id, cart.product_id, cart.count],
    );

    return cartItems.rows[0];
  }

  async removeById(cartId: string): Promise<void> {
    const cartItems = await this.pg.query(
      `DELETE FROM cart-items WHERE id=$1 RETURNING *`,
      [cartId],
    );

    return cartItems.rows;
  }
}
