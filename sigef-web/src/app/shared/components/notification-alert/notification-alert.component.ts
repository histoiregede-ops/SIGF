import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NotificationAlert } from '../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../core/services/notifications-handler.service';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrl: './notification-alert.component.scss'
})
export class NotificationAlertComponent implements OnInit, AfterViewInit {

  duration: number = 0
  @Input() notification!: NotificationAlert

  constructor(
    private notificationsHandlerService: NotificationsHandlerService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.duration = this.notification.duration!
    const interval = setInterval(() => {
      this.duration = this.duration - 200;
      // console.log(`${this.notification.id!} - Temps écoulé : ${this.duration} ms`);

      if (this.duration <= 0) {
        clearInterval(interval)
      }
    }, 200);
  }

  /**
   * Retire une notification manuellement
   */
  removeNotification(notificationId: number) {
    this.notificationsHandlerService.removeNotification(notificationId)
  }
}
