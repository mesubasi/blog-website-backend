import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
  register(@Body() dto: AuthDTO) {
    return this.authService.register(dto); //AuthDTO'yu fonksiyona gönder
  }
}
