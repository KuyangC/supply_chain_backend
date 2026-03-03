/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['ADMIN', 'MANAGER', 'OPERATOR', 'VIEWER'])
  role?: 'ADMIN' | 'MANAGER' | 'OPERATOR' | 'VIEWER';
}
