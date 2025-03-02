import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../shared/services/snackbar.service';
import { LoaderService } from '../services/loader.service';
import { debounceTime, Subscription, switchMap } from 'rxjs';
import { TaskService } from '../services/task.service';
import { SnackType } from '../shared/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit, OnDestroy {
  @ViewChild('viewTask') viewTask: TemplateRef<any> | undefined;
  resFound = false;
  viewData: any;
  buttonInfo = { text: "Add Task", route: "/app/add", icon: 'add' };
  columnData!: {
    count: number,
    rows: any[]
  };
  statusChanged: boolean = false;
  offset = { offset: 5 };
  subscriptionObj = new Subscription();
  constructor(
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private loader: LoaderService,
    private taskService: TaskService,
    private route: Router
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
    this.statusChanged = true;
  }
  onCancel(dialogRef: MatDialogRef<any>): void {
    dialogRef.close();
  }
  onSave(dialogRef: MatDialogRef<any>) {
    dialogRef.close(this.viewData);

  }
  onView(templateRef: TemplateRef<any>, data: any) {
    this.viewData = data;
    this.viewData.isView = true;
    const dialogRef = this.dialog.open(templateRef, {
      width: '450px',
      disableClose: true,
    });
  };


  onEdit(templateRef: TemplateRef<any>, data: any) {
    this.viewData = data;
    this.viewData.isView = false;
    const dialogRef = this.dialog.open(templateRef, {
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.statusChanged) {
          this.loader.showLoader();
          this.statusChanged = false;
          this.subscriptionObj.add(this.taskService.editTask(data?.id, { status: data?.status || 'open' }).subscribe({
            next: (res) => {
              this.loader.hideLoader();
              this.snackbar.openSnackBar({ message: "Task Updated Successfully", snacktype: SnackType.Success, class: 'success' });
              this.getAllTasks();
            }, error: (err) => {
              this.loader.hideLoader();
              this.snackbar.openSnackBar({ message: err, snacktype: SnackType.Error, class: 'error' });
            }
          }))
        }

      }

    });
  }
  offsetData(event: any) {
    this.offset.offset = event;
    this.getAllTasks(this.offset);
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
  onFilter(status: string) {
    this.getAllTasks(status);
  }
  onSearch(input: string) {
    this.taskService.searchSubject.next(input);
    this.subscriptionObj.add(this.taskService.searchSubject.pipe(
      debounceTime(300),
      switchMap((searchTerm: any): any => {

        return this.getAllTasks(
          {
            searchText: searchTerm,
            offset: 0,
          })
      })
    ).subscribe({
      next: (res) => {
      }
    }))
  }

  navigateTo(event: string) {
    if (event) {
      this.route.navigate([event]);
    }
  }
  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}
