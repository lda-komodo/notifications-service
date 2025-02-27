// adapters/in/kafka/game-event.consumer.ts
import {Controller, Inject, Injectable, Logger} from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import {GAMING_PLAYER_ITEM_ACQUIRED_TOPIC, GAMING_PLAYER_LEVEL_UP_TOPIC} from "../../../../shared/config/kafka.config";
import {BaseEventController} from "./base-event.controller";

@Controller()
export class GameEventController extends BaseEventController{

  @MessagePattern(GAMING_PLAYER_LEVEL_UP_TOPIC)
  async handlePlayerLevelUpTopicMessage(@Payload() event: any): Promise<void> {
    this.logger.log(`Evento recibido: ${JSON.stringify(event)}`);
    // Aquí se llamaría al caso de uso
  }

  @MessagePattern(GAMING_PLAYER_ITEM_ACQUIRED_TOPIC)
  async handleItemAcquiredTopicMessage(@Payload() event: any): Promise<void> {
    this.logger.log(`Evento recibido: ${JSON.stringify(event)}`);
    // Aquí se llamaría al caso de uso
  }
}