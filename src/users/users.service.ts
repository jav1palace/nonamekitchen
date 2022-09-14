import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
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
    const getCriteria = () => ({
      username: createUserDto.username,
    });
    const getUser = (hash: string) => ({
      ...getCriteria(),
      password: hash,
    });

    if (await this.userRepository.findOneBy(getCriteria())) {
      throw new BadRequestException('This user already exists');
    }
    const hash = await this.encryptionService.hashPassword(
      createUserDto.password,
    );
    const newUser = this.userRepository.create(getUser(hash));
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let hash: string;
    const isUsernameInvalid = async () =>
      updateUserDto.username &&
      (await this.userRepository.findOneBy({
        username: updateUserDto.username,
      }));

    if (!(await this.findOne(id))) {
      throw new NotFoundException("Can't find the user to update.");
    }

    if (await isUsernameInvalid()) {
      throw new BadRequestException('This user already exists');
    }

    if (updateUserDto.password) {
      hash = await this.encryptionService.hashPassword(updateUserDto.password);
      updateUserDto.password = hash;
    }

    return this.userRepository.save({
      id,
      username: updateUserDto.username,
      ...(updateUserDto.password && { password: updateUserDto.password }),
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!(await this.findOne(id))) {
      throw new NotFoundException("Can't find the user to delete.");
    }

    return this.userRepository.delete(id);
  }
}
