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
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { SharedModule } from './shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { LoaderComponent } from './loader/loader.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonListComponent } from './common-list/common-list.component';
import { HtttpInterceptor } from './services/htttp.interceptor';
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
    ReportComponent,
    ChartComponent,
    ClockComponent,
    LoaderComponent,
    CommonListComponent
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
    MatDialogModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatPaginatorModule,
    AngularFireAuthModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HtttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
