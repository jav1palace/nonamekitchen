import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { EncryptionService } from '../encryption/encryption.service';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const user = {
    id: 1,
    username: 'username',
    password: 'password',
    isActive: 1,
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login', () => {
    const { ...response } = user;
    expect(service.validateUser('username', 'password')).resolves.toMatchObject(
      response,
    );
  });

  it('login [wrong password]', () => {
    expect(service.validateUser('username', 'wrong')).resolves.toBeNull();
  });

  it('login [wrong password]', () => {
    expect(service.validateUser('wrong', 'password')).resolves.toBeNull();
  });
});
