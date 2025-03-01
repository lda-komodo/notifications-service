export interface NotificationServiceInterface {
  processNotification(notification: {
    userId: string;
    message: string;
  }): Promise<void>;
}
