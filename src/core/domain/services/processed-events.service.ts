import {Injectable} from "@nestjs/common";
import {ProcessedEventsRepositoryInterface} from "../ports/processed-events-repository.interface";

@Injectable()
export class ProcessedEventsService {
    constructor(private readonly repository: ProcessedEventsRepositoryInterface) {}

    async isProcessed(eventId: string): Promise<boolean> {
        return await this.repository.exists(eventId);
    }

    async markAsProcessed(eventId: string, ttl: number): Promise<void> {
        await this.repository.save(eventId, ttl);
    }
}