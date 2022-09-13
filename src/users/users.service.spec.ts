import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const dto = { username: 'username', password: 'password' };
  const users = [
    { id: 1, username: 'username', password: 'password', isActive: 1 },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        EncryptionService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(users),
            findOneBy: jest
              .fn()
              .mockResolvedValueOnce(users[0])
              .mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(new DeleteResult()),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', () => {
    expect(service.findAll()).resolves.toBe(users);
  });

  it('find', () => {
    expect(service.findOne(1)).resolves.toBe(users[0]);
  });

  it('remove', () => {
    expect(service.remove(1)).resolves.toBeDefined(); 
    expect(service.remove(2)).rejects.toThrowError(NotFoundException);
  });

  it('update', () => {
    expect(service.update(1, dto)).resolves.toBeUndefined(); // THIS IS WRONG
    expect(service.update(2, {})).rejects.toThrowError(NotFoundException);
  });

  it('create', () => {
    expect(service.create(dto)).rejects.toThrowError(BadRequestException);
    expect(service.create(dto)).resolves.toBeUndefined(); // THIS IS WRONG
  });
});
