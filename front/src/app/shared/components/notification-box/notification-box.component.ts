import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationBoxService } from '../../services/notification-box/notification-box.service';
import { CommonModule } from '@angular/common';
import { NotificationTypes } from '../../../core/models/notification-box.interface';

@Component({
    selector: 'app-notification-box',
    templateUrl: './notification-box.component.html',
    styleUrls: ['./notification-box.component.scss'],
    standalone: true,
    imports: [CommonModule]
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
