import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }


  openDialog(data: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '100ms',
      disableClose: true,
    });
    return dialogRef;
  }

}
