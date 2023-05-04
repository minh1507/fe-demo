import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgToastService } from 'ng-angular-popup';
import { HomeComponent } from 'src/app/components/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLayout: boolean = false;
  user: string = ""
  avatar: boolean = false

  constructor(
    private close: HomeComponent,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    let user: string = this.cookieService.get('name');
    if (user) {
      this.isLayout = true;
      this.user = "Xin chào " + user
    }
  }

  logout() {
    let user: string = this.cookieService.get('name');
    this.toast.success({
      detail: 'SUCCESS',
      summary: "Hẹn gặp lại " + user
    });

    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }

  closes(){
    this.close.sidebar()
  }

  avatarBtn() {
    this.avatar = !this.avatar
  }
}
