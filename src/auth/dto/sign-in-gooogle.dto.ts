import { IsEmail, IsNotEmpty } from 'class-validator';

export class signInGoogleDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
