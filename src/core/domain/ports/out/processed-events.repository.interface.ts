export interface ProcessedEventsRepositoryInterface {
  exists(eventId: string): Promise<boolean>;

  save(eventId: string, ttl: number): Promise<void>;
}
