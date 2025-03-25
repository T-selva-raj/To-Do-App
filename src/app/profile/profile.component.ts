import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../services/profile.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileData: any;
  editProfileForm!: FormGroup;
  selectedFile: File | null = null;
  subscriptionObj: Subscription = new Subscription();
  taskCompleted: number = 0;
  profileImage: string | ArrayBuffer | null = "";
  @ViewChild('editProfileTemplate') editProfileTemplate?: TemplateRef<any>;

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private snakbar: SnackbarService,
    private loader: LoaderService,
  ) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData(): void {
    this.loader.showLoader();
    this.subscriptionObj.add(this.profileService.getProfileData().subscribe(
      (res: any) => {
        if (res?.result) {
          this.profileData = res.result;
          this.profileImage = res.result.profileImage ?? this.profileImage;
          this.profileService.setProfileImage({ profileImage: this.profileImage?.toString() ?? '', userName: this.profileData.userName });
          this.taskCompleted = res.result?.taskCompleted ?? 10000;
          this.loader.hideLoader();
          this.snakbar.openSnackBar({ message: "Profile fetched successfully.!", snacktype: SnackType.Success, class: 'success', duration: 1000 });
          this.setCountOfTask(this.taskCompleted);
        }
      }, (error: any) => {
        this.loader.hideLoader();
        this.snakbar.openSnackBar({ message: error.error ?? "Failed to get profile details..!", snacktype: SnackType.Error, class: 'error', duration: 1000 });
      }));
  }

  setCountOfTask(target: number): void {
    let init = 0;
    const counter = document.getElementById('counter');
    if (!counter) return;

    counter.innerHTML = init.toString();

    const updateCounter = () => {
      if (init < target && init <= 100) {
        setTimeout(() => {
          init++;
          counter.innerHTML = init > 100 ? "100+" : init.toString();
          updateCounter();
        }, 150);
      }
    };

    updateCounter();
  }

  openEditProfileDialog(templateRef: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '450px',
      disableClose: true,
    });
    this.editProfileForm = this.fb.group({
      userName: [this.profileData.userName, [Validators.required]],
      profileImage: [null]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.editProfileForm.valid) {
        this.updateProfile();
      }
    });
  }

  updateProfile(): void {
    const formData = new FormData();
    formData.append("userName", this.editProfileForm.value.userName);

    if (this.editProfileForm.value.profileImage) {
      formData.append("profileImage", this.editProfileForm.value.profileImage);
    }
    this.loader.showLoader();
    this.subscriptionObj.add(this.profileService.editProfileData(formData).subscribe(
      (res: any) => {
        this.loader.hideLoader();
        this.getProfileData();
      }, (error: any) => {
        this.loader.hideLoader();
        this.snakbar.openSnackBar({ message: error.error ?? "Failed to update profile details..!", snacktype: SnackType.Error, class: 'error', duration: 1000 });
      }));
  }

  onCancel(dialogRef: MatDialogRef<any>): void {
    dialogRef.close();
  }

  onSave(dialogRef: MatDialogRef<any>): void {
    if (this.editProfileForm.valid && !this.editProfileForm.pristine) {
      dialogRef.close(this.editProfileForm.value);
    }
    else this.snakbar.openSnackBar({ message: "No changes to update..!", snacktype: SnackType.Warning, class: 'info' });

  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        this.editProfileForm.patchValue({ profileImage: file });
      };
      reader.readAsDataURL(file);
      this.editProfileForm.markAsDirty();
    }
  }

  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}
