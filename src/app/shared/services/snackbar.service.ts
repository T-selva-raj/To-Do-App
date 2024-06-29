import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { SnackType, Snackbar } from '../models/models';
/**
 * SnackBar Service
 */
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  /**
   * Snackbar details
   */
  details = [
    { type: SnackType.Success, icon: 'check' },
    { type: SnackType.Error, icon: 'error' },
    { type: SnackType.Warning, icon: 'warning' },
    { type: SnackType.Default, icon: 'clear' },
    { type: SnackType.Info, icon: 'info' },
  ]
  /**
   * 
   * @param snackBar Import MatSnackBar
   */
  constructor(private snackBar: MatSnackBar) {

  }
  /**
   * Method used to open SnackBar
   * @param input 
   */
  openSnackBar(input: Snackbar) {

    const property = this.details.find(x => x.type === input.snacktype);
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        header: input.message,
        content: property?.icon,
        type: property?.type
      },
      duration: input.duration ? input.duration : 3000,
      verticalPosition: 'bottom',
      panelClass: input.class ? input.class : 'success'
    });
  }

}
