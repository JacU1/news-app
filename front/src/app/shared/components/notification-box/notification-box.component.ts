import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationTypes } from 'src/app/core/models/notification-box.interface';
import { NotificationBoxService } from '../../services/notification-box/notification-box.service';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit, OnDestroy {

  public notificationType?: NotificationTypes | null;
  public notificationMessage?: string | null;
  public notificationBox$ = this._notificationBoxService.notificationBox$.asObservable();

  private subs = new Subscription();

  constructor(private readonly _notificationBoxService: NotificationBoxService) {
    this.subs.add(this.notificationBox$.subscribe(res => {
      this.notificationType = res.type;
      this.notificationMessage = res.message;
    }));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
