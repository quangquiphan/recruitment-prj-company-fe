import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder
  ) {
    this.resetPasswordForm = this.fb.group({
      passwordHash: ['', Validators.pattern(AppConstant.PATTERNS.PASSWORD)],
      confirmPassword: ['', Validators.pattern(AppConstant.PATTERNS.PASSWORD)]
    })
  }

  ngOnInit(): void {
    
  }
}