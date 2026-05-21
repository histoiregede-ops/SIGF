import { Injectable } from '@angular/core';
import { NotificationAlert, TypesNotificationAlert } from '../../data/interfaces/NotificationAlert';
import { BehaviorSubject, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsHandlerService {

  private notifications: NotificationAlert[] = []
  private _notifications = new BehaviorSubject<NotificationAlert[]>([])

  constructor() { }

  setNotifications(notifications: NotificationAlert[]): void {
    this.notifications = notifications
    this._notifications.next(this.notifications)
  }

  getNotifications(): Observable<NotificationAlert[]> {
    return this._notifications
  }

  success(description: string, title: string = 'Succès'): void {
    this.addNotification({ type: TypesNotificationAlert.SUCCESS, description, title, duration: 5000 });
  }

  error(description: string, title: string = 'Erreur'): void {
    this.addNotification({ type: TypesNotificationAlert.DANGER, description, title, duration: 7000 });
  }

  warning(description: string, title: string = 'Attention'): void {
    this.addNotification({ type: TypesNotificationAlert.WARNING, description, title, duration: 6000 });
  }

  addNotification(notification: NotificationAlert): void {
    notification.id = this.generateRandomID()
    notification.duration = notification.duration ?? 5000
    this.notifications.unshift(notification)
    this._notifications.next(this.notifications)

    setTimeout(() => {
      this.removeNotification(notification.id!)
    }, notification.duration);
  }

  removeNotification(id: number): void {
    this.notifications = this.notifications.filter(value => value.id != id)
    this._notifications.next(this.notifications)
  }

  private generateRandomID(): number {
    const min = 100000000000;
    const max = 999999999999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log(randomNumber);

    return randomNumber
  }
}
