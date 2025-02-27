import {Controller, Inject, Logger} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";

@Controller('base-event.controller')
export abstract class BaseEventController {
    protected readonly logger = new Logger(this.constructor.name);
}
