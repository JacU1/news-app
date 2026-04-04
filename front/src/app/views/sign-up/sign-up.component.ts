import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';
import { MovingBannersComponent } from '../../shared/components/moving-banners/moving-banners.component';
import { BasePage } from '../../shared/classes/BasePage';
import { AuthService } from '../../shared/services/auth/auth-service';
import { NotificationBoxService } from '../../shared/services/notification-box/notification-box.service';
import { CsrfService } from '../../shared/services/csrf/csrf.service';
import { CustomFormValidators } from '../../shared/classes/custom-form-validators';
import { NotificationTypes } from '../../core/models/notification-box.interface';

@Component({
  selector: 'app-signUp-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, MovingBannersComponent]
})
export class SignUpComponent extends BasePage {

  private formGroup!: FormGroup;

  get getPasswordFormGroup(): FormGroup {
    return this.formGroup.get("passwordFormGroup") as FormGroup;
  }

  get getFormGroup(): FormGroup {
    return this.formGroup;
  }

  constructor(private readonly _fb: FormBuilder,
              private readonly _authService: AuthService,
              private readonly _notificationBox: NotificationBoxService,
              private readonly _router: Router,
              override readonly _csrf: CsrfService) 
    {
    super(_csrf);

    this.formGroup = this._fb.group({
      firstName: new FormControl<string | null>('', [Validators.required]),
      lastName: new FormControl<string | null>('', [Validators.required]),
      email: new FormControl<string | null>('', [Validators.required, Validators.email]),
      passwordFormGroup: this._fb.group({
        password: new FormControl<string | null>('', [
          Validators.required, 
          Validators.min(5),
          Validators.max(25), 
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)]),
        confirmPassword: new FormControl<string | null>('', [Validators.required]),
      },{
        validator: CustomFormValidators.confirmPasswordValidator
      }),
      userTag: new FormControl<string | null>('', [Validators.required, Validators.min(5)])
    });
  }

  // ngOnInit removed as it was empty

  onSubmit() : void {
    this._authService.registerUser(this.formGroup).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this._notificationBox.showNotificationBox(NotificationTypes.SUCCES, "Register done!");
      this._router.navigateByUrl("/");
    });
  }

  onResetForm(): void {
    this.formGroup.reset();
  }

}
