import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  //CRUD İşlemleri Burada
  constructor(private authService: AuthService) {} //AuthServisi Import Et
  @Post('register')
  @ApiOperation({
    summary: 'Endpoint for Registration',
  })
  @ApiResponse({ status: 201, description: 'Successfully Registered!' })
  @ApiBody({ type: AuthDTO })
  @Throttle({ short: { limit: 3, ttl: 1000 } })
  register(@Body() dto: AuthDTO) {
    return this.authService.register(dto); //AuthDTO'yu fonksiyona gönder
  }

  @Post('login')
  @ApiOperation({
    summary: 'Endpoint for Login',
  })
  @ApiResponse({ status: 200, description: 'Successfully Login!' })
  @ApiResponse({ status: 401, description: 'Wrong Email or Password!' })
  @ApiBody({ type: AuthDTO })
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthDTO) {
    return this.authService.login(dto); //AuthDTO'yu fonksiyona gönder
  }
}
