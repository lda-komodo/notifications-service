export interface EventValidationServiceInterface<T> {
  shouldProcess(eventContext: T): Promise<boolean>;
}
