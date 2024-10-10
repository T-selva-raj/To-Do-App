import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../shared/services/snackbar.service';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';
import { SnackType } from '../shared/models/models';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit, OnDestroy {
  @ViewChild('viewTask') viewTask: TemplateRef<any> | undefined;
  resFound = false;
  viewData = {
    name: "sample",
    description: "The code snippet provided appears to be a mix of HTML, Angular, and some pseudocode-like syntax. However, there are some inconsistencies that need to be corrected for i",
    priority: "high",
    due: "1-1-24",
    status: 'done'
  };

  columnData!: {
    count: number,
    rows: any[]
  }
  subscriptionObj = new Subscription();
  constructor(
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private loader: LoaderService,
    private taskService: TaskService
  ) {

  }

  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks(data?: any) {
    this.loader.showLoader();
    this.subscriptionObj.add(this.taskService.getAllTasks(data).subscribe({
      next: (res) => {
        this.loader.hideLoader();
        this.resFound = true;
        this.columnData = res.result;
        if (this.columnData?.count) this.snackbar.openSnackBar({ message: "Details Fetched Successfully", snacktype: SnackType.Success, class: 'success' });
      },
      error: (err) => {
        this.loader.hideLoader();
        this.snackbar.openSnackBar({ message: err?.error || err?.message, snacktype: SnackType.Error, class: 'error' });
      }
    }))
  }


  onStatusChange(task: any, event: string) {
    task.status = event;
  }
  onCancel(dialogRef: MatDialogRef<any>): void {
    dialogRef.close();
  }
  onSave(dialogRef: MatDialogRef<any>) {
    dialogRef.close(this.viewData);

  }
  onView(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef, {
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  };
  offsetData(event: any) {
    this.getAllTasks({ offset: event });
  }
  OnDelete(event: any) {
    this.loader.showLoader();
    this.subscriptionObj.add(this.taskService.deleteTask(event?.id).subscribe({
      next: (res) => {
        this.loader.hideLoader();
        this.snackbar.openSnackBar({ message: "Task Deleted Successfully", snacktype: SnackType.Success, class: 'success' });
        this.getAllTasks();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.snackbar.openSnackBar({ message: err?.error || err?.message, snacktype: SnackType.Error, class: 'error' });
      }
    }))
  }
  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}
