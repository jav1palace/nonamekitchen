import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

const baseConfig = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  synchronize: true,
};

const testConfig = {
  type: 'sqlite',
  synchronize: true,
  database: ':memory:',
  entities: [User],
};

const connections = {
  development: baseConfig,
  production: baseConfig,
  test: testConfig,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(
      connections[process.env.NODE_ENV] || connections.production,
    ),
  ],
})

export class DatabaseModule { }
