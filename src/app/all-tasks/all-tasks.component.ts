import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent {
  @ViewChild('viewTask') viewTask: TemplateRef<any> | undefined;

  viewData = {
    name: "sample",
    description: "The code snippet provided appears to be a mix of HTML, Angular, and some pseudocode-like syntax. However, there are some inconsistencies that need to be corrected for i",
    priority: "high",
    due: "1-1-24",
    status: 'done'
  };

  columnRef = [
    { heading: "Task name", column: "name" },
    { heading: "Dead Line", column: 'due' },
    { heading: "Created On", column: "createdAt" },
    { heading: "Priority", column: 'priority' },
    { heading: "Status", column: 'status' },
    { heading: 'Actions', type: 'action' }
  ];
  columnData = {
    count: 25,
    rows: [
      { name: "sample2", due: "1-1-1111", priority: "med", status: "open", createdAt: "1-2-30" },
      { name: "sample3", due: "1-1-1111", priority: "high", status: "done", createdAt: "1-2-30" },
      { name: "sample4", due: "1-1-1111", priority: "low", status: "done", createdAt: "1-2-30" },
      { name: "sample5", due: "1-1-1111", priority: "high", status: "done", createdAt: "1-2-30" },
      { name: "sample6", due: "1-1-1111", priority: "high", status: "done", createdAt: "1-2-30" }
    ]
  };

  constructor(private dialog: MatDialog) {

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
  }

}
