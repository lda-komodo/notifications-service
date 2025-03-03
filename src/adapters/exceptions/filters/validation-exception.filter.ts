import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  protected readonly logger = new Logger(this.constructor.name);

  async catch(exception: BadRequestException, host: ArgumentsHost) {
    this.logger.error(
      `Validation error: ${JSON.stringify(exception.getResponse())}`,
    );
  }
}
