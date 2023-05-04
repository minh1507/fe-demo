import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { NgToastModule } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import {  UserComponent } from './components/home/user/user.component';
import { PermitComponent } from './components/home/permit/permit.component';
import { DialogComponent } from './components/static/dialog/dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormCreateComponent } from './components/home/user/form-create/form-create.component';
import { Interceptor } from './interceptor';
import { FormUpdateComponent } from './components/home/user/form-update/form-update.component';
import { FormDeleteComponent } from './components/home/user/form-delete/form-delete.component';
import { FooterComponent } from './layouts/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    PermitComponent,
    DialogComponent,
    FormCreateComponent,
    FormUpdateComponent,
    FormDeleteComponent,
    FooterComponent,
    
  ],
  imports: [
    MatSidenavModule,
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularToastifyModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatFormFieldModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [ToastService, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
