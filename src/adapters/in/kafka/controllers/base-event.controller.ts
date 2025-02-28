import { Controller, Logger } from '@nestjs/common';

@Controller('base-event.controller')
export abstract class BaseEventController {
  protected readonly logger = new Logger(this.constructor.name);
}
