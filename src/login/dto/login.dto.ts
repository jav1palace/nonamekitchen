import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class LoginDto extends PartialType(CreateUserDto) {}
