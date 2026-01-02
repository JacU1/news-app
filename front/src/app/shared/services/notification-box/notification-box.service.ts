import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INotificationBox, NotificationTypes } from 'src/app/core/models/notification-box.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationBoxService {

  public notificationBox$ = new Subject<INotificationBox>();

  constructor() { }

  public showNotificationBox(type: NotificationTypes, message: string): void {
    this.notificationBox$.next({type, message, show: true});

    setTimeout(() => {
      this.notificationBox$.next({type, message, show: false});
    }, 3000);
  }
}
