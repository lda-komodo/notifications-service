import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async sendNotification(userId: string, message: string): Promise<void> {
    console.log(`Sending notification to user ${userId}: ${message}`);
    // Aquí se puede agregar la integración con proveedores de notificaciones (SMS, Email, Push)
  }
}
