import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { EncryptionService } from '../encryption/encryption.service';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        EncryptionService,
        {
          provide: AuthService,
          useValue: {
            login: jest
              .fn()
              .mockResolvedValueOnce(true)
              .mockRejectedValue(new BadRequestException()),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            get: jest.fn(() => 'mockUserEntity'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login', () => {
    expect(
      controller.login({ username: 'username', password: 'password' }),
    ).resolves.toBe(true);
  });

  it('login [wrong password]', () => {
    expect(
      controller.login({ username: 'username', password: 'wrong' }),
    ).rejects.toThrowError(BadRequestException);
  });

  it('login [wrong username]', () => {
    expect(
      controller.login({ username: 'wrong', password: 'password' }),
    ).rejects.toThrowError(BadRequestException);
  });
});
