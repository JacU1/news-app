import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsApiService } from './services/news-API/news-api.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { LoadingSpinnerInterceptor } from './interceptors/loading-spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerService } from './services/loading-spinner/loading-spinner.service';
import { AuthService } from './services/auth/auth-service';
import { NotificationBoxComponent } from './components/notification-box/notification-box.component';
import { MovingBannersComponent } from './components/moving-banners/moving-banners.component';
import { CsrfService } from './services/csrf/csrf.service';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    NotificationBoxComponent,
    MovingBannersComponent
  ],
  imports: [MatProgressSpinnerModule, CommonModule],
  exports: [LoadingSpinnerComponent, NotificationBoxComponent,MovingBannersComponent],
  providers: [NewsApiService, LoadingSpinnerService, AuthService, CsrfService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true,
   },
  ]
})
export class SharedModule { }
