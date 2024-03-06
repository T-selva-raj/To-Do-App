import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashBoardDetailsComponent } from './dash-board-details/dash-board-details.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {path:'dashboard',component:DashBoardDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
