import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ControlsValidatorsService{

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  public validateConfirmPassword(passwordControl: AbstractControl): ValidatorFn {
    return (confirmationControl: AbstractControl): { [key: string]: boolean } | null => {
      const confirmValue = confirmationControl.value;
      const passwordValue = passwordControl.value;
  
      if (!confirmValue  ||  confirmValue !== passwordValue) {
        return { confirmPasswordMismatch: true };
      }
  
      return null; // No error
    };
  }
}