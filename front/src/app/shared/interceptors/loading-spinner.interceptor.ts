import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingSpinnerService } from '../services/loading-spinner/loading-spinner.service';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {

  private readonly loadingSpinnerService = inject(LoadingSpinnerService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingSpinnerService.showSpinner();

     return next.handle(request).pipe(
           delay(3000),
           finalize(() => {
            this.loadingSpinnerService.hideSpinner();
          }),
     );
  }
}