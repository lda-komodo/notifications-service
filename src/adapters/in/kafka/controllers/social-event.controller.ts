import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC,
  SOCIAL_FRIEND_REQUEST_TOPIC, SOCIAL_NEW_FOLLOWER_TOPIC,
} from '../../../../shared/config/kafka.config';
import { BaseEventController } from './base-event.controller';
import { EventType } from '../../../../core/domain/events/event-type.enum';
import {
  SocialFriendRequestAcceptedEvent,
  SocialFriendRequestEvent,
} from '../../../../core/domain/events/types';

@Controller('social-event.consumer')
export class SocialEventController extends BaseEventController {
  @MessagePattern(SOCIAL_FRIEND_REQUEST_TOPIC)
  async handleFriendRequestTopicMessage(
    @Payload() event: SocialFriendRequestEvent,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} timestamp: ${event.timestamp}`,
    );
    return await this.callSupportedUseCase(
      event,
      EventType.FRIEND_REQUEST_SENT,
    );
  }

  @MessagePattern(SOCIAL_FRIEND_REQUEST_ACCEPTED_TOPIC)
  async handleFriendRequestAcceptedTopicMessage(
    @Payload() event: SocialFriendRequestAcceptedEvent,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} timestamp: ${event.timestamp}`,
    );
    return await this.callSupportedUseCase(
      event,
      EventType.FRIEND_REQUEST_ACCEPTED,
    );
  }

  @MessagePattern(SOCIAL_NEW_FOLLOWER_TOPIC)
  async handleNewFollowerTopicMessage(
    @Payload() event: SocialFriendRequestAcceptedEvent,
  ): Promise<void> {
    this.logger.log(
      `Event received: ${event.messageId} timestamp: ${event.timestamp}`,
    );
    return await this.callSupportedUseCase(
      event,
      EventType.NEW_FOLLOWER,
    );
  }
}
