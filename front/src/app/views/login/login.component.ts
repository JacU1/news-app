import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
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
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationBoxService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  #host = inject(ElementRef<HTMLElement>);
  #disposeGlobe?: () => void;

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

  ngAfterViewInit(): void {
    const globeContainer = this.#host.nativeElement.querySelector('[data-globe]') as HTMLElement | null;
    if (!globeContainer || !globeContainer.clientWidth || !globeContainer.clientHeight) return;

    void import('../../js-components/globe/globe.js').then(({ startGlobe }) => {
      if (globeContainer.isConnected) this.#disposeGlobe = startGlobe(globeContainer);
    });
  }

  ngOnDestroy(): void {
    this.#disposeGlobe?.();
  }

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
