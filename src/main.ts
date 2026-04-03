import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cookieParser = require('cookie-parser')
  app.enableCors({ origin: ['http://localhost:3001'], credentials: true })
  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));



  const config = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('sistema para la gestión de libros e inventarios xd')
    .setVersion('1.2')
    .addTag('books')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
  console.log(`Aplicación corriendo en: ${await app.getUrl()}`);
}
bootstrap();