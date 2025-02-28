export interface NotificationChannelInterface {
  send(message: string): Promise<void>;
}
