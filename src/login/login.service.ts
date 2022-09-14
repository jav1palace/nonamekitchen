import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      username: loginDto.username,
    });
    if (!user) {
      throw new BadRequestException('Username or password incorrect');
    }

    const isCorrect = await this.encryptionService.isPasswordCorrect(
      loginDto.password,
      user.password,
    );
    if (!isCorrect) {
      throw new BadRequestException('Username or password incorrect');
    }

    return true;
  }
}
