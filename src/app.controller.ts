import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Request Successful!' })
  @ApiResponse({ status: 401, description: 'Unauthorised Access!' })
  @Throttle({ short: { limit: 3, ttl: 1000 } })
  getHello(@Request() req: any): string {
    return this.appService.getHello();
  }
}
