import {
  Controller,
  Get,
  Request,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { headers } from './constants';
import {
  LocalAuthGuard,
  AuthService,
  JwtAuthGuard,
  BasicAuthGuard,
} from './auth';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get(['', 'ping'])
  healthCheck(@Req() req: any): any {
    console.log(req);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.user, 'basic');

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers,
      data: {
        ...token,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers,
      data: {
        user: req.user,
      },
    };
  }
}
