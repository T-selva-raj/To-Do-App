import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DashBoardDetailsComponent } from './dash-board-details/dash-board-details.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginAuthGuard } from './shared/guards/login.guard';
import { CanDeactivateGuard } from './shared/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginAuthGuard] },
  { path: 'register', component: SignupPageComponent, canActivate: [LoginAuthGuard] },
  {
    path: 'app', component: DashBoardComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashBoardDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'add', component: AddTaskComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'all', component: AllTasksComponent },
      { path: 'report', component: ReportComponent },
      { path: '**', redirectTo: '/app/dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
