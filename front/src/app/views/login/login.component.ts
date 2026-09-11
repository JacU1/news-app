import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MovingBannersComponent } from '../../shared/components/moving-banners/moving-banners.component';
import { NotificationBoxService } from '../../shared/services/notification-box/notification-box.service';
import { AuthService } from '../../shared/services/auth/auth-service';
import { NotificationTypes } from '../../core/models/notification-box.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MovingBannersComponent],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationBoxService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly isSubmitting = signal(false);

  readonly loginFormGroup = this.fb.group({
    loginName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    rememberMeCheckBox: new FormControl(false),
  });

  public onLoginClick(): void {
    this.isSubmitting.set(true);

    this.authService
      .loginUser(this.loginFormGroup)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.notificationService.showNotificationBox(
            NotificationTypes.SUCCES,
            'Login successful !',
          );
          this.router.navigate(['app', 'home']);
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }

  public onRegisterNewUserClick(): void {
    this.router.navigate(['signup']);
  }
}
