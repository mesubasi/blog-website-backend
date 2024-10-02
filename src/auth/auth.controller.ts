import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController { //CRUD İşlemleri Burada
    constructor(private authService: AuthService){} //AuthServisi Import Et.
    @Post("register")
    register(@Body() dto: AuthDTO){
        return this.authService.register(dto) //AuthDTO'yu fonksiyona gönder
    }
}
