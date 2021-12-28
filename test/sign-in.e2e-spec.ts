import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from 'supertest';

describe('SignInController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/sign-in (POST)', () => {
    return request(app.getHttpServer())
      .post('/sign-in')
      .send({ email: 'invalid email', password: 'lllll' })
      .expect(400);
  });
});