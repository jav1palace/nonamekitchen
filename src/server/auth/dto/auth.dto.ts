import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  access_token: string;
}
