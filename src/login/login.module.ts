import { Module } from '@nestjs/common';
import { EncryptionModule } from '../encryption/encryption.module';
import { UsersModule } from '../users/users.module';
import { LoginService } from './login.service';

@Module({
  imports: [UsersModule, EncryptionModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
