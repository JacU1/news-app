import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovingBannersComponent } from '../../shared/components/moving-banners/moving-banners.component';
import { AuthService } from '../../shared/services/auth/auth-service';
import { NotificationBoxService } from '../../shared/services/notification-box/notification-box.service';
import { CustomFormValidators } from '../../shared/classes/custom-form-validators';
import { NotificationTypes } from '../../core/models/notification-box.interface';

@Component({
  selector: 'app-signUp-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MovingBannersComponent,
  ],
})
export class SignUpComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _notificationBox = inject(NotificationBoxService);
  private readonly _router = inject(Router);

  readonly isSubmitting = signal(false);

  private readonly formGroup: FormGroup = this._fb.group({
    firstName: new FormControl<string | null>('', [Validators.required]),
    lastName: new FormControl<string | null>('', [Validators.required]),
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormGroup: this._fb.group(
      {
        password: new FormControl<string | null>('', [
          Validators.required,
          Validators.min(5),
          Validators.max(25),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
          ),
        ]),
        confirmPassword: new FormControl<string | null>('', [
          Validators.required,
        ]),
      },
      {
        validator: CustomFormValidators.confirmPasswordValidator,
      },
    ),
    userTag: new FormControl<string | null>('', [
      Validators.required,
      Validators.min(5),
    ]),
  });

  get getPasswordFormGroup(): FormGroup {
    return this.formGroup.get('passwordFormGroup') as FormGroup;
  }

  get getFormGroup(): FormGroup {
    return this.formGroup;
  }

  onSubmit(): void {
    this.isSubmitting.set(true);

    this._authService
      .registerUser(this.formGroup)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this._notificationBox.showNotificationBox(
            NotificationTypes.SUCCES,
            'Register done!',
          );
          this._router.navigateByUrl('/');
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
  }

  onResetForm(): void {
    this.formGroup.reset();
  }
}
