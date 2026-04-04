import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { MovingBannersComponent } from '../../shared/components/moving-banners/moving-banners.component';
import { BasePage } from '../../shared/classes/BasePage';
import { NotificationBoxService } from '../../shared/services/notification-box/notification-box.service';
import { AuthService } from '../../shared/services/auth/auth-service';
import { CsrfService } from '../../shared/services/csrf/csrf.service';
import { NotificationTypes } from '../../core/models/notification-box.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MovingBannersComponent]
})
export class LoginComponent extends BasePage {

  public loginFormGroup = this.fb.group({
    loginName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(25)]),
    rememberMeCheckBox: new FormControl(false)
  });

  constructor(private readonly fb: FormBuilder,
    private readonly _notificationService: NotificationBoxService,
    private readonly _router: Router, 
    private readonly _authService: AuthService,
    override readonly _csrf: CsrfService)
    {
      super(_csrf);
    }

  public onLoginClick(): void {
    this._authService.loginUser(this.loginFormGroup).pipe(takeUntil(this.destroyed$))
    .subscribe(() => {
      this._notificationService.showNotificationBox(NotificationTypes.SUCCES, "Login successful !");
      this._router.navigate(['app', 'home']);
    });
  }

  public onRegisterNewUserClick(): void {
    this._router.navigate(["signup"]);
  }
}
