import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenService: AngularTokenService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordValidator })
  }

  get emailCtrl() {
    return this.signUpForm.get('email');
  }

  get passwordCtrl() {
    return this.signUpForm.get('password');
  }

  get confirmPasswordCtrl() {
    return this.signUpForm.get('confirmPassword');
  }

  passwordValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : {
      passwordValidator: true
    };
  }

  onSubmit() {
    if (!this.signUpForm.valid) { return; }

    this.tokenService.registerAccount({
      login: this.emailCtrl.value,
      password: this.passwordCtrl.value,
      passwordConfirmation: this.confirmPasswordCtrl.value
    }).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/shops'])
      },
      error => console.log(error)
    );
  }
}
