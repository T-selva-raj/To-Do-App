import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  username = '';
  email = '';
  editProfileForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";
  @ViewChild('editProfileTemplate') editProfileTemplate: TemplateRef<any> | undefined;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.editProfileForm = this.fb.group({
      username: [this.username],
      email: [this.email]
    });
  }
  ngOnInit(): void {
    let init = 0, target = 1001;

    const updateCounter = () => {
      if (init < target) {
        setTimeout(() => {
          init += 1;
          counter.innerHTML = init.toString();

          if (init > 100) {
            counter.innerHTML = "100+";
          }
          if (init <= 100) {
            updateCounter();
          }
        }, 15);
      }
    };

    let counter = document.getElementById('counter') as HTMLElement;
    counter.innerHTML = init.toString();
    updateCounter();
  }
  openEditProfileDialog(templateRef: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.username = this.editProfileForm.value.username;
        this.email = this.editProfileForm.value.email;
      }
    });
  }

  onCancel(dialogRef: MatDialogRef<any>): void {
    dialogRef.close();
  }

  onSave(dialogRef: MatDialogRef<any>): void {
    if (this.editProfileForm.valid) {
      dialogRef.close(this.editProfileForm.value);
    }
  }


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
