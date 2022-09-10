import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await this.encryptionService.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({ username: createUserDto.username, password: hash });
    return this.userRepository.create(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
    if (!this.findOne(id)) {
      throw new NotFoundException('Can\'t find the user to update.')
    }
    
    return this.userRepository.save({
      id,
      username: updateUserDto.username,
      password: updateUserDto.password
    });
  }

  remove(id: number) : Promise<DeleteResult> {
    if (!this.findOne(id)) {
      throw new NotFoundException('Can\'t find the user to delete.')
    }

    return this.userRepository.delete(id);
  }
}
