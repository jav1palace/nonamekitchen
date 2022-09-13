import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    if (await this.userRepository.findOneBy({ username: createUserDto.username})) {
      throw new BadRequestException('This user already exists');
    }
    const hash = await this.encryptionService.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({ username: createUserDto.username, password: hash });
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
    let hash : string;
    if (!await this.findOne(id)) {
      throw new NotFoundException('Can\'t find the user to update.')
    }

    if (updateUserDto.username && await this.userRepository.findOneBy({ username: updateUserDto.username})) {
      throw new BadRequestException('This user already exists');
    }

    if (updateUserDto.password) {
      hash = await this.encryptionService.hashPassword(updateUserDto.password);
      updateUserDto.password = hash;
    }
    
    return this.userRepository.save({
      id,
      username: updateUserDto.username,
      ...(updateUserDto.password) && {password: updateUserDto.password}, 
    });
  }

  async remove(id: number) : Promise<DeleteResult> {
    if (!await this.findOne(id)) {
      throw new NotFoundException('Can\'t find the user to delete.')
    }

    return this.userRepository.delete(id);
  }
}
