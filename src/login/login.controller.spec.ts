import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { EncryptionService } from '../encryption/encryption.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { BadRequestException } from '@nestjs/common';

describe('LoginController', () => {
  let controller: LoginController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        EncryptionService,
        {
          provide: LoginService,
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

    controller = module.get<LoginController>(LoginController);
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
