import { Component } from '@angular/core';
import { LoadingSpinnerService } from '../../services/loading-spinner/loading-spinner.service';
import { Observable, isObservable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  constructor(private readonly loadingSpinnerService: LoadingSpinnerService) {}

  public isLoading$: Observable<boolean> = toObservable(this.loadingSpinnerService.isLoading$);

}
