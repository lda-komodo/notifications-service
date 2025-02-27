import {Injectable, Logger} from "@nestjs/common";
import {ProcessedEventsService} from "../../domain/services/processed-events.service";
import {GameLevelUpEvent} from "../../domain/events/types";
import {NotificationService} from "../../domain/services/notifications.service";

@Injectable()
export class ProcessGameEventUseCase {
  constructor(
    private readonly processedEventsService: ProcessedEventsService,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(event: GameLevelUpEvent): Promise<void> {
    /*const alreadyProcessed = await this.processedEventsService.isProcessed(event.id);

    if (alreadyProcessed) {
      Logger.warn(`Evento ${event.id} ya procesado, ignorando...`);
      return;
    }

    await this.notificationService.sendNotification({});
    await this.processedEventsService.markAsProcessed(event.id, 3600);
     */

    Logger.log(`ProcessGameEventUseCase...`);
  }
}
