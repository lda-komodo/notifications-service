import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC,
  SOCIAL_FRIEND_REQUEST_TOPIC,
} from '../../../../shared/config/kafka.config';
import { BaseEventController } from './base-event.controller';

@Controller('social-event.consumer')
export class SocialEventController extends BaseEventController {
  @MessagePattern(SOCIAL_FRIEND_REQUEST_TOPIC)
  async handlePlayerLevelUpTopicMessage(@Payload() event: any): Promise<void> {
    this.logger.log(`Evento recibido: ${JSON.stringify(event)}`);
    // Aquí se llamaría al caso de uso
  }

  @MessagePattern(SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC)
  async handleItemAcquiredTopicMessage(@Payload() event: any): Promise<void> {
    this.logger.log(`Evento recibido: ${JSON.stringify(event)}`);
    // Aquí se llamaría al caso de uso
  }
}
