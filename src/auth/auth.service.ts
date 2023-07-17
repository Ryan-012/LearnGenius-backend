import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
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

  async register(userData: CreateUserDto) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (user) throw new ConflictException('Email already exists');

    userData.password = bcryptjs.hashSync(userData.password, 10);

    try {
      user = await this.prisma.user.create({
        data: {
          ...userData,
        },
      });

      const access_token = await this.generateToken({
        name: user.name,
        sub: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60,
      });

      const refresh_token = await this.generateToken({
        name: user.name,
        sub: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      });
      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
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
      const access_token = await this.generateToken({
        name: user.name,
        sub: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60,
      });

      const refresh_token = await this.generateToken({
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

  async generateAccessTokenFromRefreshToken(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();

    try {
      const user = await this.verifyRefreshToken(refreshToken);

      const newAccessToken = await this.generateToken({
        name: user.name,
        sub: user.sub,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60,
      });

      return { newAccessToken };
    } catch (error) {
      throw new InternalServerErrorException('Failed to sign the JWT token');
    }
  }

  private async verifyRefreshToken(refreshToken: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      return {
        name: decodedToken.name,
        sub: decodedToken.sub,
        role: decodedToken.role,
        exp: Math.floor(Date.now() / 1000) + 60,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async generateToken(payload: any) {
    try {
      return await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to sign the JWT token');
    }
  }
}
