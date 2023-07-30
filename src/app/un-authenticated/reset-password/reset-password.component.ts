import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm: FormGroup = new FormGroup({});
  resetCode: string = '';
  disable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticateSevice: AuthenticateService,
  ) {
    this.resetPasswordForm = this.fb.group({
      passwordHash: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]]
    })
  }

  ngOnInit(): void {
    this.resetCode = this.activatedRoute.snapshot.paramMap.get('reset-code') || ''
  }

  onReset() {
    let params = {
      passwordHash: AppUtil.hasMD5(this.resetPasswordForm.value.passwordHash),
      confirmPassword: AppUtil.hasMD5(this.resetPasswordForm.value.confirmPassword)
    }
    
    this.disable = true;
    this.authenticateSevice.resetPassword(this.resetCode, AppUtil.toSnakeCaseKey(params)).subscribe(
      res => {
        if (res.status === 200) {
          this._router.navigate(['/successfully']).then(r => {});
        } else {
          this.resetPasswordForm.reset();
        }
      }
    )
  }
}