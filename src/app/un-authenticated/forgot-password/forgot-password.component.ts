import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm: FormGroup = new FormGroup({});
  disable: boolean = false;

  constructor(
    private fb : FormBuilder, 
    private _router : Router, 
    private authenticateService : AuthenticateService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.EMAIL)
      ]],
      type: [ AppConstant.ACCOUNT_TYPE.COMPANY ]
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.disable = true;
    this.authenticateService.forgotPassword(AppUtil.toSnakeCaseKey(this.forgotPasswordForm.value)).subscribe(res => {
        if (res.status === 200) {
            this._router.navigate(['/check-your-email']).then(r => {});
            this.forgotPasswordForm.disable();
        }
    })
  }
}