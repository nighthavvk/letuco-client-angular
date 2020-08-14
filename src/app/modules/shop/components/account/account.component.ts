import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { FormBuilder, FormGroup, Validators, ValidationErrors, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertsService } from '../../../../services/alerts/alerts.service';
import { SellersService } from '../../services/sellers/sellers.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('updatePasswordFormRef') updatePasswordFormRef: NgForm
  @ViewChild('updatePasswordSubmitButton') updatePasswordSubmitButton: ElementRef
  @ViewChild('sellerInviteFormRef') sellerInviteFormRef: NgForm
  @ViewChild('sellerInviteSubmitButton') sellerInviteSubmitButton: ElementRef

  updatePasswordForm: FormGroup
  sellerInviteForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenService: AngularTokenService,
    private alertService: AlertsService,
    private sellersService: SellersService
  ) { }

  ngOnInit(): void {
    this.updatePasswordForm = this.fb.group({
      passwordCurrent: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordValidator })

    this.sellerInviteForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  get emailCtrl() {
    return this.sellerInviteForm.get('email');
  }

  get passwordCurrentCtrl() {
    return this.updatePasswordForm.get('passwordCurrent');
  }

  get passwordCtrl() {
    return this.updatePasswordForm.get('password');
  }

  get confirmPasswordCtrl() {
    return this.updatePasswordForm.get('confirmPassword');
  }

  passwordValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : {
      passwordValidator: true
    };
  }

  onSellerInviteSubmit() {
    if (this.sellerInviteForm.invalid) {
      this.emailCtrl.markAsTouched();
      return;
    }

    this.sellerInviteSubmitButton.nativeElement.setAttribute('disabled', true);

    this.inviteSeller();
  }

  inviteSeller() {
    this.sellersService.invite({
      email: this.emailCtrl.value
    }).subscribe(
      (res: any) => {
        this.updatePasswordFormRef.reset();
        this.alertService.showAlertSuccess(`Invite was successfully sent to ${res.email}`);
        this.sellerInviteSubmitButton.nativeElement.removeAttribute('disabled');
      },
      err => {
        this.sellerInviteSubmitButton.nativeElement.removeAttribute('disabled');
        this.alertService.showAlertDanger(err.error.errors.full_messages[0]);
      }
    );
  }

  onUpdatePasswordSubmit() {
    if (this.updatePasswordForm.invalid) {
      this.passwordCurrentCtrl.markAsTouched();
      this.passwordCtrl.markAsTouched();
      this.confirmPasswordCtrl.markAsTouched();
      return;
    }

    this.updatePasswordSubmitButton.nativeElement.setAttribute('disabled', true);

    this.updatePassword();
  }

  updatePassword() {
    this.tokenService.updatePassword({
      passwordCurrent: this.passwordCurrentCtrl.value,
      password: this.passwordCtrl.value,
      passwordConfirmation: this.confirmPasswordCtrl.value
    }).subscribe(
      res => {
        this.updatePasswordFormRef.reset();
        this.alertService.showAlertSuccess('Password was successfully updated');
        this.updatePasswordSubmitButton.nativeElement.removeAttribute('disabled');
      },
      err => {
        this.updatePasswordSubmitButton.nativeElement.removeAttribute('disabled');
        this.alertService.showAlertDanger(err.error.errors.full_messages[0]);
      }
    );
  }

  deleteAccount() {
    this.tokenService.deleteAccount().subscribe(
      res => {
        this.router.navigate(['/'], { state: { data: { alertMessage: res.message }}});
      },
      err => {
        this.alertService.showAlertDanger(err.message);
      }
    );
  }
}
