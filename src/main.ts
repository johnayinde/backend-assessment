import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // security middlewares
  app.enableCors();
  app.use(helmet());

  // OpenAPI Specification
  const config = new DocumentBuilder()
    .setTitle('Media API')
    .setDescription(
      'A REST API using Nestjs to create CRUD operations on medias table',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_PORT || 5000);
}
bootstrap();
