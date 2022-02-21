import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2)
  password: string;

  @IsNotEmpty()
  @Length(2)
  passwordConfirmation: string;
}
