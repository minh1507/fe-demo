import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/home/user/user.component';
import { PermitComponent } from './components/home/permit/permit.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: UserComponent },
      { path: 'permit', component: PermitComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
