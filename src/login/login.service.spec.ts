import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { User } from '../users/entities/user.entity';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  const user = {
    id: 1,
    username: 'username',
    password: 'password',
    isActive: 1,
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: EncryptionService,
          useValue: {
            isPasswordCorrect: jest
              .fn()
              .mockResolvedValueOnce(true)
              .mockResolvedValueOnce(false)
              .mockResolvedValueOnce(true)
              .mockResolvedValue(false),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest
              .fn()
              .mockResolvedValueOnce(user)
              .mockResolvedValueOnce(user)
              .mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login', () => {
    expect(
      service.login({ username: 'username', password: 'password' }),
    ).resolves.toBe(true);
  });

  it('login [wrong password]', () => {
    expect(
      service.login({ username: 'username', password: 'wrong' }),
    ).rejects.toThrowError(BadRequestException);
  });

  it('login [wrong password]', () => {
    expect(
      service.login({ username: 'wrong', password: 'password' }),
    ).rejects.toThrowError(BadRequestException);
  });
});
