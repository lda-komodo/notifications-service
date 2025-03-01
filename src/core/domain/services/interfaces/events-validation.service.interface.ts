export interface EventValidationServiceInterface<T> {
  shouldProcess(event: T): Promise<boolean>;
}
