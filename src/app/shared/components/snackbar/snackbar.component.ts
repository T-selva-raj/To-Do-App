import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
/**
 * SnackBar Component
 */
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  /**
   * 
   * @param data Snackbar data
   * @param snackBarRef SnackBar Component Close Action
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<SnackbarComponent>) {

  }
  /**
   * Method used to close snackbar 
   */
  onclose() {
    this.snackBarRef.dismiss()
  }
}