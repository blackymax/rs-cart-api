import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';

@Injectable()
export class CartService {
  constructor(@InjectClient() private readonly pg: Client) {}

  async findByUserId(userId: string): Promise<any> {
    const carts = await this.pg.query(
      `SELECT * FROM carts WHERE user_id=$1 LIMIT 1`,
      [userId],
    );

    if (!carts.rows?.[0]?.id) {
      return null;
    }

    const cartItems = await this.pg.query(
      `SELECT * FROM cart_items 
      JOIN products ON products.id = cart_items.product_id WHERE cart_id=$1`,
      [carts.rows[0].id],
    );

    const cart = {
      id: carts.rows[0].id,
      items: cartItems.rows.map(cartItem => ({
        product: { ...cartItem },
        count: cartItem.count,
      })),
    };

    return cart;
  }

  async createByUserId(userId: string) {
    const carts = await this.pg.query(
      `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`,
      [userId],
    );

    const userCart = {
      id: carts.rows[0].id,
      items: [],
    };

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<any> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    const newCart = await this.createByUserId(userId);

    return newCart;
  }

  async updateByUserId(userId: string, { product, count }: any): Promise<any> {
    const { id, ...rest }: any = await this.findOrCreateByUserId(userId);

    const existing = await this.pg.query(
      `SELECT * FROM cart_items WHERE product_id=$1 AND cart_id=$2`,
      [product.id, id],
    );


    if (count > existing.rows?.[0]?.count || !existing.rows?.[0]) {
      if (existing.rows[0]) {

        console.log("UPDATE")
        await this.pg.query(
          `UPDATE cart_items SET count=$3 WHERE product_id=$1 AND cart_id=$2`,
          [product.id, id, count],
        );
      } else {
        console.log("INSERT")
        await this.pg.query(
          `INSERT INTO cart_items (product_id, cart_id, count) VALUES($1, $2, $3)`,
          [product.id, id, count],
        );
      }
    } else if (count === 0 && existing.rows?.[0]?.count > count) {
      await this.pg.query(`DELETE FROM cart_items WHERE product_id=$1`, [
        product.id,
      ]);
    } else {
      await this.pg.query(
        `UPDATE cart_items SET count = $1 WHERE cart_id = $2 AND product_id=$3`,
        [count, id, product.id],
      );
    }

    const createdCartItems = await this.pg.query(
      `SELECT * FROM cart_items 
      JOIN products ON products.id = cart_items.product_id WHERE cart_id=$1`,
      [id],
    );

    const updatedCart = {
      id,
      ...rest,
      items: createdCartItems.rows.map(cartItem => ({
        product: { ...cartItem },
        count: cartItem.count,
      })),
    };

    return updatedCart;
  }

  async removeByUserId(userId): Promise<void> {
    await this.pg.query(`DELETE FROM carts WHERE user_id=$1 LIMIT 1`, [userId]);
  }
}

// @Injectable()
// export class CartService {
//   constructor(@InjectClient() private readonly pg: Client) {}

//   async findById(cartId: string): Promise<Cart> {
//     const carts = await this.pg.query(
//       `SELECT * FROM carts WHERE id=$1 LIMIT 1`,
//       [cartId],
//     );
//     return carts.rows[0];
//   }

//   async findByUserId(userId: string): Promise<any> {
//     const carts = await this.pg.query(
//       `SELECT * FROM carts WHERE user_id=$1 LIMIT 1`,
//       [userId],
//     );
//     return carts.rows[0];
//   }

//   async create(userId: string) {
//     const carts = await this.pg.query(
//       `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`,
//       [userId],
//     );

//     return carts.rows[0];
//   }

//   async removeById(cartId: string): Promise<void> {
//     await this.pg.query(`DELETE FROM carts WHERE id=$1 RETURNING * LIMIT 1`, [
//       cartId,
//     ]);
//   }

//   async removeByUserId(userId: string): Promise<void> {
//     await this.pg.query(
//       `DELETE FROM carts WHERE user_id=$1 RETURNING * LIMIT 1`,
//       [userId],
//     );
//   }

//   async findAllProductsByCartId(cartId: string) {
//     const carts = await this.pg.query(
//       `SELECT * FROM cart_items
//     join products on products.id = product_id where cart_id = $1`,
//       [cartId],
//     );
//     return carts.rows;
//   }
// }
