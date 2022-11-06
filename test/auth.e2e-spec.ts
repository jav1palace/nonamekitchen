import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { UsersService } from '../src/server/users/users.service';
import { AppModule } from './../src/server/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;

  const errorResponse = {
    statusCode: 401,
    message: 'Unauthorized',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get(UsersService);
    await usersService.create({ username: 'username', password: 'password' });
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'username', password: 'password' })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body.access_token).toBeDefined();
      });
  });

  it('/login (POST) [wrong password]', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'username', password: 'wrong' })
      .expect(401)
      .expect(errorResponse);
  });

  it('/login (POST) [wrong username]', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'wrong', password: 'password' })
      .expect(401)
      .expect(errorResponse);
  });
});
