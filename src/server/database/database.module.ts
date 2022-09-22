import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';

// const baseConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'eu-cdbr-west-03.cleardb.net',
//   port: 3306,
//   username: 'b59ab79ef5734d',
//   password: '9433bf64',
//   database: 'heroku_58484eeea6dfec3',
//   entities: [User],
//   synchronize: true,
// };

const baseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  synchronize: true,
};

const testConfig: TypeOrmModuleOptions = {
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
export class DatabaseModule {}
