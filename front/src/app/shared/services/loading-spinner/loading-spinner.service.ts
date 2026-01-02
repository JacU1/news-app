import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingSpinnerService {

  public isLoading$ = signal<boolean>(false);

  constructor() {}

  public showSpinner(): void {
    this.isLoading$.set(true);
  }

  public hideSpinner(): void {
    this.isLoading$.set(false);
  }

}
