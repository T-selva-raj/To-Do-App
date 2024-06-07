import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashBoardDetailsComponent } from './dash-board-details/dash-board-details.component';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { ZenFlexLayoutModule } from "zen-flex-layout";
import { ProfileComponent } from './profile/profile.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReportComponent } from './report/report.component';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { ChartComponent } from './chart/chart.component';
import { MatMenuModule } from '@angular/material/menu';
import { ClockComponent } from './clock/clock.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';



import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../enviorment";
import { SharedModule } from './shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { LoaderComponent } from './loader/loader.component';
Chart.register(...registerables);
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    DashBoardComponent,
    DashBoardDetailsComponent,
    CommonHeaderComponent,
    ProfileComponent,
    AddTaskComponent,
    AllTasksComponent,
    ContactUsComponent,
    ReportComponent,
    ChartComponent,
    ClockComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ZenFlexLayoutModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
