import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInGoogleDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
