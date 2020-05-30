import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, NgForm } from '@angular/forms';
import { AngularTokenService } from 'angular-token';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild('signUpFormRef') signUpFormRef: NgForm
  @ViewChild('submitButton') submitButton: ElementRef

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tokenService: AngularTokenService,
    private alertService: AlertsService
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
    if (this.signUpForm.invalid) {
      this.emailCtrl.markAsTouched();
      this.passwordCtrl.markAsTouched();
      this.confirmPasswordCtrl.markAsTouched();
      return;
    }

    this.submitButton.nativeElement.setAttribute('disabled', true);

    this.tokenService.registerAccount({
      login: this.emailCtrl.value,
      password: this.passwordCtrl.value,
      passwordConfirmation: this.confirmPasswordCtrl.value
    }).subscribe(
      res => {
        this.alertService.showAlertSuccess(`
          A confirmation email was sent to your account at ${res.data.email}.
          You must follow the instructions in the email before your account can be activated`,
          {
            selfClosing: false
          }
        );
        this.signUpFormRef.reset();
        this.submitButton.nativeElement.removeAttribute('disabled');
      },
      err => {
        this.alertService.showAlertDanger(err.error.errors[0]);
        this.submitButton.nativeElement.removeAttribute('disabled');
      }
    );
  }
}
