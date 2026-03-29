import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationBoxComponent } from './shared/components/notification-box/notification-box.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: true,
    imports: [RouterModule,NotificationBoxComponent, LoadingSpinnerComponent]
})
export class AppComponent {
  title = 'news-app-angular';
}
