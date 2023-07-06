import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  register(userData: CreateUserDto) {
    return 'this is a test registration!';
  }

  async signIn(credentials: LoginDto) {
    const { email, password } = credentials;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    try {
      return {
        token: await this.jwtService.signAsync(
          {
            name: user.name,
            sub: user.id,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 60,
          },
          { secret: process.env.JWT_SECRET_KEY },
        ),
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to sign the JWT token');
    }
  }
}
