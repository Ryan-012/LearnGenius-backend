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
import { AuthorizationService } from 'src/authorization/authorization.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(userData: CreateUserDto) {
    return 'this is a test registration!';
  }

  async signIn(credentials: LoginDto): Promise<any> {
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
      const access_token = await this.authorizationService.generateToken({
        name: user.name,
        sub: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60,
      });

      const refresh_token = await this.authorizationService.generateToken({
        name: user.name,
        sub: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      });
      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException('Failed to sign the JWT token');
    }
  }
}
