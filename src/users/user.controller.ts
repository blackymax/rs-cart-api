import { Controller, Post, Get, Req, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users';
import { headers } from '../constants';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { AppRequest } from '../shared';

@Controller('api/user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post('/registration')
  async registerUser(@Req() req: AppRequest) {
    console.log(req.body);
    const { name, password, email } = req.body;

    const user = await this.userService.create({ name, password, email });
    console.log(user);
    return {
      statusCode: HttpStatus.OK,
      headers,
      message: 'OK',
      data: { user },
    };
  }

  @Get('/get-users')
  async getUsers() {
    const users = await this.userService.getAll();
    console.log(users);
    return {
      statusCode: HttpStatus.OK,
      headers,
      message: 'OK',
      data: { users },
    };
  }

  @Get()
  async findById(@Req() req: AppRequest) {
    const { id } = req.body;

    const user = await this.userService.findOne(id);
    console.log(user);
    return {
      statusCode: HttpStatus.OK,
      headers,
      message: 'OK',
      data: { user },
    };
  }
}
