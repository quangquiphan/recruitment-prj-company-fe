import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});
  isKeep: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authenticateService: AuthenticateService
  ) {
    
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.signInForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.EMAIL)
      ]],
      passwordHash: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]],
      keepLogin: [this.isKeep]
    })
  }

  onSignIn() {
    let params = {
      email: this.signInForm.value.email,
      passwordHash: AppUtil.hasMD5(this.signInForm.value.passwordHash),
      keepLogin: Boolean (this.signInForm.value.keepLogin)
    }

    this.authenticateService.login(AppUtil.toSnakeCaseKey(params)).subscribe(
      res => {
        if (res.status === 200) {
          this.authenticateService.setToken(res.data.accessToken);
          this.router.navigate(['jobs']).then(r => {});
        }  else {
          AppUtil.getMessageFailed(this.messageService, this.translateService,
            'message.sign_in_failed');
          this.signInForm.reset();
        }
      }
    )    
  }
}
