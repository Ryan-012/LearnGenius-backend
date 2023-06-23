import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  register(userData: CreateUserDto) {
    return 'this is a test registration!';
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    try {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
