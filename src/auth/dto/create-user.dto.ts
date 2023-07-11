import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  emailVerified: boolean;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsIn(['STUDENT', 'TEACHER', 'ADMIN'])
  role: string;
}
