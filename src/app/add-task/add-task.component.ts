import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';
import { Router } from '@angular/router';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { DialogService } from '../shared/services/dialog.service';
import { MESSAGES } from '../shared/constants/messages';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnDestroy {
  taskform!: FormGroup;
  priority: string[] = ["High", "Medium", "Low"];
  subscriptionObj: Subscription = new Subscription();
  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private loader: LoaderService,
    private snackbar: SnackbarService,
    private router: Router,
    private dialog: DialogService) {
    this.taskform = this.fb.group({
      taskName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      dueDate: ['', [Validators.required]],
      importance: ['High', [Validators.required]],
      status: ['open']
    });
  }


  dateFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return d !== null && d >= currentDate;
  }

  clearForm(value: FormGroup) {
    if (value.dirty) {
      this.showConfirmationDialog().subscribe((confirmed) => {
        if (confirmed) {
          value.reset();
          this.router.navigate(['/app/all']);
        }
      });
    } else {
      value.reset();
      this.router.navigate(['/app/all']);
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.taskform.dirty) {
      return this.showConfirmationDialog();
    }
    return true;
  }

  private showConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.dialog.openDialog({
      title: "Alert",
      message: MESSAGES.DEACTIVATE
    });
    return dialogRef.afterClosed();
  }

  onSubmit() {
    if (this.taskform.valid) {
      this.loader.showLoader();
      this.subscriptionObj.add(
        this.taskService.createTask(this.taskform.value).subscribe(res => {
          if (res) {
            this.loader.hideLoader();
            this.taskform.reset();
            this.snackbar.openSnackBar({ message: "Task added Successfully", snacktype: SnackType.Success, class: 'success' });
            this.router.navigate(['/app/all']);
          }
        }, (error) => {
          this.loader.hideLoader();
          (error);

        })
      )
    }
  }
  ngOnDestroy(): void {
    this.loader.hideLoader();
    this.subscriptionObj.unsubscribe();
  }

}
