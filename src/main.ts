import { loadApiConfiguration } from '@libs/common/config/base-configuration';
import { initWinston, winstonLogger } from '@libs/common/logging';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationError } from './utils/CustomValidationError';

async function bootstrap() {
  const environment = loadApiConfiguration();
  initWinston(environment.apiTitle);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(environment.globalPrefix);
  await app.listen(environment.port);

  const url = await app.getUrl();

  winstonLogger?.info(
    `🚀 Application is running on port: ${url}/${environment.globalPrefix}`,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((e) => new CustomValidationError(e)),
        );
      },
    }),
  );
}
(async (): Promise<void> => {
  await bootstrap();
})().catch((error: Error) => {
  winstonLogger?.error(`Nest application error: ${error.message}`);
});
