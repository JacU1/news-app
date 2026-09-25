import { Component, inject } from '@angular/core';
import { LoadingSpinnerService } from '../../services/loading-spinner/loading-spinner.service';
import { Observable, isObservable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
    standalone: true,
    imports: [MatProgressSpinnerModule, CommonModule]
})
export class LoadingSpinnerComponent {

  private readonly loadingSpinnerService = inject(LoadingSpinnerService);

  public isLoading$: Observable<boolean> = toObservable(this.loadingSpinnerService.isLoading$);

}
