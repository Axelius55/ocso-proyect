import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config(); // Cargar las variables de entorno desde .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Ocso API')
  .setDescription('API for ocso management')
  .setVersion('0.9')
  .addBearerAuth()
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true,
  }));

  const port = process.env.PORT || 3000; // Usa el puerto del .env o 3000 por defecto
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
}

bootstrap();
