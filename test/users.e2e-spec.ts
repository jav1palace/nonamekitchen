import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const dto = { username: 'username', password: 'password' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/:id (GET) [Empty]', () =>
    request(app.getHttpServer())
      .get('/users/1') // the user previously created
      .expect(200)
      .then((res) => {
        expect(res.body).not.toHaveProperty('id');
        expect(res.body).not.toHaveProperty('username');
        expect(res.body).not.toHaveProperty('password');
        expect(res.body).not.toHaveProperty('isActive');
      }));

  it('/ (POST)', () =>
    request(app.getHttpServer())
      .post('/users')
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
      .send(dto)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('This user already exists');
      }));

  it('/:id (PATCH) [Duplicate]', () =>
    request(app.getHttpServer())
      .patch('/users/1') // the user previously created
      .send({ username: 'username' })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('This user already exists');
      }));

  it('/ (GET)', () =>
    request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((res) => {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('username');
        expect(res.body[0]).toHaveProperty('password');
        expect(res.body[0]).toHaveProperty('isActive');
      }));

  it('/:id (GET)', () =>
    request(app.getHttpServer())
      .get('/users/1') // the user previously created
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('password');
        expect(res.body).toHaveProperty('isActive');
      }));

  it('/:id (PATCH)', () =>
    request(app.getHttpServer())
      .patch('/users/1') // the user previously created
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
      .expect(200));

  it('/ (GET) [Empty]', () =>
    request(app.getHttpServer()).get('/users').expect(200).expect([]));

  it('/:id (PATCH) [Not Existing]', () =>
    request(app.getHttpServer())
      .patch('/users/1') // the user previously created
      .send({ password: 'aa' })
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Can't find the user to update.");
      }));

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});
