import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController { //CRUD İşlemleri Burada
    constructor(private authService: AuthService){} //AuthServisi Import Et.
    @Post("register")
    register(){
        return this.authService.register()
    }
}
