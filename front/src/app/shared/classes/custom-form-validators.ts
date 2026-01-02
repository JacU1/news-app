import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomFormValidators {
    
    static confirmPasswordValidator(control: AbstractControl) {
        const password = control.get('password')?.value; 
        const confirmPassword = control.get('confirmPassword')?.value;
        if (password !== confirmPassword) {
            control.get('confirmPassword')?.setErrors({ NoPassswordMatch: true });
        }
    }
}
