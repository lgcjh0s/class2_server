import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from './common/common.logger';

async function bootstrap() {

  const logger = new Logger();
  const exphbs = require('express-handlebars');
  const hbs = exphbs.create({
    extname: '.hbs'
  });
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'service'));
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

  await app.listen(3000);

  logger.info('Server started!');
}
bootstrap();