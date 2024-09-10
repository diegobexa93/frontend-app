import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, User } from '../../models/user.model';
import { Person } from '../../models/person.model';
import { ControlsValidatorsService } from '../../shared/services/controls-validators.service';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private controlsValidatorsService: ControlsValidatorsService,
  ) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      personName: ['', Validators.required],
      personEmail: ['', Validators.required]
    });
  }

  ngOnInit(): void {     
    this.enablePassword();
  }

  passwordConditions = [
    { 
      message: 'Must be at least 8 characters!', 
      hasError: () => this.userForm.controls['password'].hasError('required') || this.userForm.controls['password'].hasError('minlength') 
    },
    { 
      message: 'Must contain at least 1 number!', 
      hasError: () => this.userForm.controls['password'].hasError('required') || this.userForm.controls['password'].hasError('hasNumber') 
    },
    { 
      message: 'Must contain at least 1 uppercase letter!', 
      hasError: () => this.userForm.controls['password'].hasError('required') || this.userForm.controls['password'].hasError('hasCapitalCase') 
    },
    { 
      message: 'Must contain at least 1 lowercase letter!', 
      hasError: () => this.userForm.controls['password'].hasError('required') || this.userForm.controls['password'].hasError('hasSmallCase') 
    },
    { 
      message: 'Must contain at least 1 special character!', 
      hasError: () => this.userForm.controls['password'].hasError('required') || this.userForm.controls['password'].hasError('hasSpecialCharacters') 
    },
    { 
      message: 'Passwords do not match!', 
      hasError: () => this.userForm.controls['confirmPassword'].hasError('confirmPasswordMismatch') 
    }
  ];

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: IUser = {
        guidId: this.userForm.value.guidId,
        password: this.userForm.value.password,
        person: { name: this.userForm.value.personName } as Person // Adjust according to your Person model
      };

      const user = new User(userData.guidId, userData.password, userData.person);
      console.log('User data submitted:', user);
      // Handle your CRUD operation here (e.g., save to a service)
    }
  }

  enablePassword(): void {
    this.userForm.controls['confirmPassword'].setValidators([
      Validators.required,
      this.controlsValidatorsService.validateConfirmPassword(this.userForm.controls["password"])
    ]);

    this.userForm.controls['password'].setValidators(Validators.compose([
      Validators.required,
      ControlsValidatorsService.patternValidator(/\d/, { hasNumber: true }),
      ControlsValidatorsService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      ControlsValidatorsService.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ControlsValidatorsService.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
      Validators.minLength(8)
    ]));

    this.userForm.controls['password'].updateValueAndValidity();
    this.userForm.controls['confirmPassword'].updateValueAndValidity();
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName) && (this.userForm.controls[controlName].touched || this.userForm.controls[controlName].dirty);
  }
  

 
  
}
