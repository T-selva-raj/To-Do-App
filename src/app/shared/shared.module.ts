import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    SnackbarComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    SnackbarComponent
  ]
})
export class SharedModule { }
