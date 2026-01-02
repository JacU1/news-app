import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { NotificationTypes } from 'src/app/core/models/notification-box.interface';
import { BasePage } from 'src/app/shared/classes/BasePage';
import { CustomFormValidators } from 'src/app/shared/classes/custom-form-validators';
import { AuthService } from 'src/app/shared/services/auth/auth-service';
import { CsrfService } from 'src/app/shared/services/csrf/csrf.service';
import { NotificationBoxService } from 'src/app/shared/services/notification-box/notification-box.service';

@Component({
  selector: 'app-signUp-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends BasePage implements OnInit {

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

  override ngOnInit(): void {
    console.log(this.formGroup); 
  }

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
