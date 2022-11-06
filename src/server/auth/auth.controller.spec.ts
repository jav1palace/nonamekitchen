import { JwtService } from '@nestjs/jwt';
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
        AuthService,
        JwtService,
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
    const req = { user: { username: 'username', password: 'password' } };
    expect(controller.login(req)).resolves.toEqual({
      ...req,
      msg: 'User logged in',
    });
  });
});
