import { AuthAPIService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private toast: NgToastService,
    private router: Router,
    private formBuilder: FormBuilder,
    private AuthAPIService: AuthAPIService,
    private cookieService: CookieService
  ) {}

  formLogin = this.formBuilder.group({
    username: '',
    password: '',
  });

  ngOnInit(): void {}

  onSubmit() {
    this.AuthAPIService.login(
      this.formLogin.value.username as string,
      this.formLogin.value.password as string
    ).subscribe((response) => {
      if (response.isSuccess) {
        this.cookieService.set('name', response.username);
        this.cookieService.set('role', response.role);
        this.cookieService.set('token', response.accessToken);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Đăng nhập thành công',
        });

        this.router.navigate(['home']);
      } else {
        this.toast.warning({
          detail: 'WARNING',
          summary: 'Đăng nhập thất bại',
        });
      }
    });
  }
}
