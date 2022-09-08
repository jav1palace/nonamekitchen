import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const baseConfig = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
};

const testConfig = {
  type: 'sqlite',
  synchronize: true,
  database: ':memory:',
  entities: ['src/**/*.entity.ts'],
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
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
