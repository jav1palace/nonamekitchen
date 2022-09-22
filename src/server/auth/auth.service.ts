import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EncryptionService } from '../encryption/encryption.service';
import { User } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  // update any
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      username,
    });

    const canLogin =
      user?.isActive &&
      (await this.encryptionService.isPasswordCorrect(pass, user.password));

    if (canLogin) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async getToken(user: User): Promise<AuthDto> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
