import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC,
  SOCIAL_FRIEND_REQUEST_TOPIC,
  SOCIAL_NEW_FOLLOWER_TOPIC,
} from '../../../../infrastructure/kafka/kafka.config';
import { BaseEventController } from './base-event.controller';
import { EventType } from '../../../../core/domain/events/event-type.enum';
import { BaseSocialEventPayload } from '../../../../core/domain/events/events-payloads';

@Controller('social-event.consumer')
export class SocialEventController extends BaseEventController {
  @EventPattern(SOCIAL_FRIEND_REQUEST_TOPIC)
  async handleFriendRequestTopicMessage(
    @Payload() event: BaseSocialEventPayload,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} timestamp: ${event.timestamp}`,
    );
    return await this.callSupportedUseCase(
      event,
      EventType.FRIEND_REQUEST_SENT,
    );
  }

  @EventPattern(SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC)
  async handleFriendRequestAcceptedTopicMessage(
    @Payload() event: BaseSocialEventPayload,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} timestamp: ${event.timestamp}`,
    );
    return await this.callSupportedUseCase(
      event,
      EventType.FRIEND_REQUEST_ACCEPTED,
    );
  }

  @EventPattern(SOCIAL_NEW_FOLLOWER_TOPIC)
  async handleNewFollowerTopicMessage(
    @Payload() event: BaseSocialEventPayload,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} timestamp: ${event.timestamp}`,
    );
    return await this.callSupportedUseCase(event, EventType.NEW_FOLLOWER);
  }
}
