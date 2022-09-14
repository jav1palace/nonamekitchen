import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';

describe('LoginController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;

  const errorResponse = {
    statusCode: 400,
    message: 'Username or password incorrect',
    error: 'Bad Request',
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

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: 'username', password: 'password' })
      .expect(200)
      .expect('true');
  });

  it('/ (POST) [wrong password]', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: 'username', password: 'wrong' })
      .expect(400)
      .expect(errorResponse);
  });

  it('/ (POST) [wrong username]', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: 'wrong', password: 'password' })
      .expect(400)
      .expect(errorResponse);
  });
});
