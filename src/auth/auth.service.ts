import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { AuthDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async register(dto: AuthDTO) {
    const hashedPass = await bcrypt.hash(dto.password, 10);
    const newUser = new this.userModel({
      email: dto.email,
      password: hashedPass,
    });
    const user = await newUser.save(); //Veritabanına Kaydet
    return this.createToken(user.email);
  }

  async login(dto: AuthDTO) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Wrong Email!');
    const isMach = await bcrypt.compare(dto.password, user.password);
    if (!isMach) throw new UnauthorizedException('Wrong Password!');
    return this.createToken(user.email);
  }

  createToken(email: string) {
    return this.jwtService.sign({ email });
  }
}
