import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;
  const password = 'password';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hashPassword function returns a value', async () => {
    expect(await service.hashPassword(password)).toBeDefined();
  });

  it('isPasswordCorrect returns true if the password matches', async () => {
    expect(await service.isPasswordCorrect(password, await service.hashPassword(password))).toBeTruthy();
  });

  it('isPasswordCorrect returns false if the password does not match', async () => {
    const hash = await service.hashPassword(password);
    expect(await service.isPasswordCorrect('wrong', hash)).toBeFalsy();
  });
});
