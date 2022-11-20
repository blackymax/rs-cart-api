import { Injectable } from '@nestjs/common';

import { InjectClient } from 'nest-postgres';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(@InjectClient() private readonly pg: Client) {}

  async findOne(userId: string): Promise<any> {
    const users = await this.pg.query(`SELECT * FROM users WHERE id=$1`, [
      userId,
    ]);
    return users.rows[0];
  }

  async create({ name, password, email }: Partial<any>): Promise<any> {
    const users = await this.pg.query(
      `INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *`,
      [name, password, email],
    );
    return users.rows[0];
  }

  async getAll(): Promise<any> {
    const users = await this.pg.query(`SELECT * FROM users`);
    return users.rows;
  }
}
