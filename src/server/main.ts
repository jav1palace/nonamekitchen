import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { RenderService } from 'nest-next';
import passport from 'passport';

import { AppModule } from './app.module';

const PORT = process.env.PORT || process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'keyboard',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const service = app.get(RenderService);
  service.setErrorHandler(async (err, req, res) => {
    res.send(err.response);
  });
  await app.listen(PORT);
}
bootstrap();
