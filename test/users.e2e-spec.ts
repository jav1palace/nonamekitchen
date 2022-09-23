import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from './../src/server/app.module';
import { UsersService } from '../src/server/users/users.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let authToken = 'Bearer ';
  const dto = { username: 'username', password: 'password' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get(UsersService);
    await usersService.create({ username: 'admin', password: 'password' });
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'password' })
      .expect(200)
      .then((res) => {
        authToken += res.body.access_token;
        expect(res.body).toHaveProperty('access_token');
        expect(res.body.access_token).toBeDefined();
      });
  });

  it('/:id (GET) [Empty]', () =>
    request(app.getHttpServer())
      .get('/users/1') // the user previously created
      .set({ Authorization: authToken, Accept: 'application/json' })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('password');
        expect(res.body).toHaveProperty('isActive');
      }));

  it('/ (POST)', () =>
    request(app.getHttpServer())
      .post('/users')
      .set({ Authorization: authToken, Accept: 'application/json' })
      .send(dto)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('password');
        expect(res.body).toHaveProperty('isActive');
      }));

  it('/ (POST) [Error]', () =>
    request(app.getHttpServer())
      .post('/users')
      .set({ Authorization: authToken, Accept: 'application/json' })
      .send(dto)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('This user already exists');
      }));

  it('/:id (PATCH) [Duplicate]', () =>
    request(app.getHttpServer())
      .patch('/users/1') // the user previously created
      .set({ Authorization: authToken, Accept: 'application/json' })
      .send({ username: 'username' })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('This user already exists');
      }));

  it('/ (GET)', () =>
    request(app.getHttpServer())
      .get('/users')
      .set({ Authorization: authToken, Accept: 'application/json' })
      .expect(200)
      .then((res) => {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('username');
        expect(res.body[0]).toHaveProperty('password');
        expect(res.body[0]).toHaveProperty('isActive');
      }));

  it('/:id (PATCH)', () =>
    request(app.getHttpServer())
      .patch('/users/1') // the user previously created
      .set({ Authorization: authToken, Accept: 'application/json' })
      .send({ password: 'aa' })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('password'); // the updated field
        expect(res.body).toHaveProperty('username'); // the existing field
        expect(res.body).toHaveProperty('isActive'); // the existing field
      }));

  it('/:id (DELETE)', () =>
    request(app.getHttpServer())
      .delete('/users/1') // the user previously created
      .set({ Authorization: authToken, Accept: 'application/json' })
      .expect(200));

  it('/:id (DELETE 2)', () =>
    request(app.getHttpServer())
      .delete('/users/2') // the user previously created
      .set({ Authorization: authToken, Accept: 'application/json' })
      .expect(200));

  it('/ (GET) [Empty]', () =>
    request(app.getHttpServer())
      .get('/users')
      .set({ Authorization: authToken, Accept: 'application/json' })
      .expect(200)
      .expect([]));

  it('/:id (PATCH) [Not Existing]', () =>
    request(app.getHttpServer())
      .patch('/users/1') // the user previously created
      .set({ Authorization: authToken, Accept: 'application/json' })
      .send({ password: 'aa' })
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Can't find the user to update.");
      }));

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});
