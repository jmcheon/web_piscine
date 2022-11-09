import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';

// import users from '../users.json';
// eslint-disable-next-line
const users = require('../users.json');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  loginLocal(authDto: AuthDto) {
    // retrieve user
    const user = users.find((user) => user.email === authDto.email);
    if (!user) {
      throw new UnauthorizedException('user does not exist');
    }
    if (user.password !== authDto.password) {
      throw new UnauthorizedException('credentials incorrect');
    }
    return this.loginUser(user.id, user.email, 'user');
  }
  // registerLocal(authDto: AuthDto) {}

  loginUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type: type,
    });
  }
}
